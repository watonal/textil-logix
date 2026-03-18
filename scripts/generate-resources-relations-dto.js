/**
 * ================================================================
 * Script: generate-resources-typed.js
 * Descripción:
 *  - Genera recursos CRUD en NestJS desde Prisma dentro de src/core.
 *  - Incluye `include` automáticamente solo si el modelo tiene relaciones.
 *  - Genera siempre los spec.ts.
 *  - Si el modelo tiene campo `codigo`, genera códigos secuenciales de 20 dígitos.
 *  - Validación: ignora valores no numéricos en `codigo` (no rompe BigInt).
 *  - Validación: si el código enviado ya existe, se genera automáticamente el siguiente disponible.
 * ================================================================
 */

const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
const srcPath = path.join(__dirname, "../src/core");

// 🔹 Asegurar que exista la carpeta core
if (!fs.existsSync(srcPath)) fs.mkdirSync(srcPath, { recursive: true });

const SCALAR_TYPES = new Set([
  "String",
  "Int",
  "BigInt",
  "Float",
  "Decimal",
  "Boolean",
  "DateTime",
  "Bytes",
  "Json",
]);

const toPascalCase = (str) =>
  str
    .replace(/_/g, " ")
    .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .replace(/\s+/g, "");

const toCamelCase = (str) => {
  const pascal = toPascalCase(str);
  return pascal[0].toLowerCase() + pascal.slice(1);
};

const toKebabCase = (str) =>
  str.replace(/_/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const schema = fs.readFileSync(schemaPath, "utf-8");
const modelRegex = /model\s+(\w+)\s+{([^}]*)}/g;

let match;
while ((match = modelRegex.exec(schema)) !== null) {
  const modelName = match[1];
  const body = match[2];

  const className = toPascalCase(modelName);
  const fileName = toKebabCase(modelName);
  const serviceVar = toCamelCase(className);
  const folderPath = path.join(srcPath, fileName);

  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  if (!fs.existsSync(path.join(folderPath, "dto")))
    fs.mkdirSync(path.join(folderPath, "dto"));

  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("//") && !l.startsWith("@@"));

  const fieldRegex = /^(\w+)\s+([A-Za-z]+)(\??)(\[\])?\s*(.*)$/;
  const fields = [];
  const relations = [];
  let pkField = "id";
  let hasCodigoField = false;

  for (const line of lines) {
    const m = line.match(fieldRegex);
    if (!m) continue;

    const [, name, type, optQ, arrQ, attrs] = m;
    const isArray = !!arrQ;
    const isScalar = SCALAR_TYPES.has(type);
    const isId = /@id\b/.test(attrs);

    if (isId) pkField = name;
    if (name === "codigo") hasCodigoField = true;

    if (!isScalar || isArray) relations.push(name);

    if (!isScalar || isArray) continue;

    fields.push({
      name,
      type,
      optional: optQ === "?",
      omitInCreate:
        isId ||
        /@default\s*\(\s*now\(\)\s*\)/.test(attrs) ||
        /@default\s*\(\s*autoincrement\(\)\s*\)/.test(attrs),
    });
  }

  const prismaToTs = (t) => {
    if (t === "String" || t === "Json" || t === "Bytes") return "string";
    if (t === "Int" || t === "BigInt" || t === "Float" || t === "Decimal")
      return "number";
    if (t === "Boolean") return "boolean";
    if (t === "DateTime") return "Date";
    return "any";
  };

  const createDtoFields = fields
    .filter((f) => !f.omitInCreate)
    .map((f) => `  ${f.name}: ${prismaToTs(f.type)};`)
    .join("\n");

  // DTOs
  const createDto = `export class Create${className}Dto {\n${createDtoFields}\n}\n`;
  fs.writeFileSync(
    path.join(folderPath, "dto", `create-${fileName}.dto.ts`),
    createDto
  );

  const updateDto = `import { PartialType } from '@nestjs/mapped-types';
import { Create${className}Dto } from './create-${fileName}.dto';

export class Update${className}Dto extends PartialType(Create${className}Dto) {}
`;
  fs.writeFileSync(
    path.join(folderPath, "dto", `update-${fileName}.dto.ts`),
    updateDto
  );

  // Service: genera include solo si hay relaciones
  const includeCode = relations.length
    ? `include: includeRelations ? { ${relations.map((r) => `${r}: true`).join(", ")} } : undefined`
    : null;

  let createMethod;
  if (hasCodigoField) {
    createMethod = `
  async create(create${className}Dto: Create${className}Dto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.${modelName}.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (create${className}Dto.codigo) {
        const dtoCodigoNum = BigInt(create${className}Dto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          create${className}Dto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        create${className}Dto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.${modelName}.create({ data: create${className}Dto });
    });
  }`;
  } else {
    createMethod = `create(create${className}Dto: Create${className}Dto) {
    return this.prisma.${modelName}.create({ data: create${className}Dto });
  }`;
  }

  // 🔹 Ajuste de ruta de PrismaService
  const service = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Create${className}Dto } from './dto/create-${fileName}.dto';
import { Update${className}Dto } from './dto/update-${fileName}.dto';

@Injectable()
export class ${className}Service {
  constructor(private prisma: PrismaService) {}

  ${createMethod}

  findAll(includeRelations = false) {
    return this.prisma.${modelName}.findMany(${includeCode ? `{ ${includeCode} }` : ""});
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.${modelName}.findUnique({
      where: { ${pkField}: id }${includeCode ? `, ${includeCode}` : ""}
    });
  }

  update(id: number, update${className}Dto: Update${className}Dto) {
    return this.prisma.${modelName}.update({
      where: { ${pkField}: id },
      data: update${className}Dto,
    });
  }

  remove(id: number) {
    return this.prisma.${modelName}.delete({ where: { ${pkField}: id } });
  }
}
`;
  fs.writeFileSync(path.join(folderPath, `${fileName}.service.ts`), service);

  // Controller
  const controller = `import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ${className}Service } from './${fileName}.service';
import { Create${className}Dto } from './dto/create-${fileName}.dto';
import { Update${className}Dto } from './dto/update-${fileName}.dto';

@Controller('${fileName}')
export class ${className}Controller {
  constructor(private readonly ${serviceVar}Service: ${className}Service) {}

  @Post()
  create(@Body() create${className}Dto: Create${className}Dto) {
    return this.${serviceVar}Service.create(create${className}Dto);
  }

  @Get()
  findAll() {
    return this.${serviceVar}Service.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${serviceVar}Service.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update${className}Dto: Update${className}Dto) {
    return this.${serviceVar}Service.update(+id, update${className}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${serviceVar}Service.remove(+id);
  }
}
`;
  fs.writeFileSync(path.join(folderPath, `${fileName}.controller.ts`), controller);

  // Module
  const moduleFile = `import { Module } from '@nestjs/common';
import { ${className}Service } from './${fileName}.service';
import { ${className}Controller } from './${fileName}.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [${className}Controller],
  providers: [${className}Service, PrismaService],
})
export class ${className}Module {}
`;
  fs.writeFileSync(path.join(folderPath, `${fileName}.module.ts`), moduleFile);

  // Specs
  const controllerSpec = `import { Test, TestingModule } from '@nestjs/testing';
import { ${className}Controller } from './${fileName}.controller';
import { ${className}Service } from './${fileName}.service';

describe('${className}Controller', () => {
  let controller: ${className}Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [${className}Controller],
      providers: [${className}Service],
    }).compile();

    controller = module.get<${className}Controller>(${className}Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
`;
  fs.writeFileSync(path.join(folderPath, `${fileName}.controller.spec.ts`), controllerSpec);

  const serviceSpec = `import { Test, TestingModule } from '@nestjs/testing';
import { ${className}Service } from './${fileName}.service';

describe('${className}Service', () => {
  let service: ${className}Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [${className}Service],
    }).compile();

    service = module.get<${className}Service>(${className}Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
`;
  fs.writeFileSync(path.join(folderPath, `${fileName}.service.spec.ts`), serviceSpec);

  console.log(`✅ Generated resources for model: ${modelName} (relations: ${relations.join(", ") || "none"})${hasCodigoField ? " + codigo" : ""}`);
}
