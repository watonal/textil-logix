/**
 * ================================================================
 * Script: generate-resources-typed.js
 * Descripción:
 *  Este script genera automáticamente los recursos básicos de un
 *  CRUD en un proyecto NestJS a partir del schema de Prisma.
 *
 * Funcionalidades:
 *  1. Lee el archivo schema.prisma y detecta todos los modelos.
 *  2. Para cada modelo genera:
 *     - DTOs (Create y Update) con los campos escalares que no son
 *       autoincrementales ni timestamps con default.
 *     - Servicio (service.ts) que utiliza Prisma para operaciones CRUD
 *       usando el nombre exacto del modelo en Prisma.
 *     - Controlador (controller.ts) con rutas REST: POST, GET, PATCH,
 *       DELETE y vinculado al servicio correspondiente.
 *     - Módulo (module.ts) con los imports y providers correctos.
 *     - Specs de testing básicos para controller y service.
 *  3. Convierte automáticamente los nombres de modelos y campos
 *     a PascalCase, camelCase y kebab-case según corresponda:
 *       - PascalCase: nombres de clases (ej. PuestoTrabajo)
 *       - camelCase: variables y servicios (ej. puestoTrabajoService)
 *       - kebab-case: rutas y nombres de archivos (ej. puesto-trabajo)
 *  4. Ignora relaciones complejas y campos de índice (@@index) para
 *     la generación de DTOs, pero los mantiene en los modelos Prisma.
 *  5. Omite automáticamente los campos de autoincremento y timestamps
 *     con default al generar los DTOs de creación.
 *
 * Resultado:
 *  - Carpeta por cada modelo dentro de src/
 *  - Dentro de cada carpeta: dto/, controller, service, module,
 *    controller.spec.ts y service.spec.ts
 *
 * Uso:
 *  $ node scripts/generate-resources-typed.js
 *
 * ================================================================
 */


const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
const srcPath = path.join(__dirname, "../src");

// Helpers
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

// Tipos escalares de Prisma que sí pueden ir al DTO
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

// Lectura del schema
const schema = fs.readFileSync(schemaPath, "utf-8");
const modelRegex = /model\s+(\w+)\s+{([^}]*)}/g;

let match;
while ((match = modelRegex.exec(schema)) !== null) {
  const modelName = match[1];         // ej: puesto_trabajo
  const body = match[2];

  const className = toPascalCase(modelName); // PuestoTrabajo
  const fileName = toKebabCase(modelName);   // puesto-trabajo
  const prismaModel = modelName;             // ¡Usa el nombre EXACTO del modelo! ej: prisma.puesto_trabajo
  const serviceVar = toCamelCase(className); // puestoTrabajo
  const folderPath = path.join(srcPath, fileName);

  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  if (!fs.existsSync(path.join(folderPath, "dto")))
    fs.mkdirSync(path.join(folderPath, "dto"));

  // Parsear campos (ignorando @@ y relaciones)
  // Formato de línea típico: "campo Tipo?[] @id @default(...) ..."
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("//") && !l.startsWith("@@")); // <- ignora atributos de bloque

  const fieldRegex = /^(\w+)\s+([A-Za-z]+)(\??)(\[\])?\s*(.*)$/;

  const fields = [];
  let pkField = "id";

  for (const line of lines) {
    const m = line.match(fieldRegex);
    if (!m) continue;

    const [, name, type, optQ, arrQ, attrs] = m;
    const isArray = !!arrQ;
    const isScalar = SCALAR_TYPES.has(type);
    const isId = /@id\b/.test(attrs);
    const hasDefaultNow = /@default\s*\(\s*now\(\)\s*\)/.test(attrs);
    const isAutoInc = /@default\s*\(\s*autoincrement\(\)\s*\)/.test(attrs);

    if (isId) pkField = name;

    // Ignora relaciones: si no es escalar o es array → es relación (o lista), no va a CreateDTO
    if (!isScalar || isArray) continue;

    fields.push({
      name,
      type,             // Prisma scalar
      optional: optQ === "?",
      attrs,
      omitInCreate: isId || hasDefaultNow || isAutoInc, // omitimos PKs y timestamps con default
    });
  }

  // Map de tipos Prisma -> TS
  const prismaToTs = (t) => {
    if (t === "String" || t === "Json" || t === "Bytes") return "string";
    if (t === "Int" || t === "BigInt" || t === "Float" || t === "Decimal") return "number";
    if (t === "Boolean") return "boolean";
    if (t === "DateTime") return "Date"; // puedes cambiar a string si prefieres
    return "any";
  };

  const createDtoFields = fields
    .filter((f) => !f.omitInCreate)
    .map((f) => `  ${f.name}: ${prismaToTs(f.type)};`)
    .join("\n");

  // DTOs
  const createDto = `export class Create${className}Dto {
${createDtoFields}
}
`;
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

  // Controller (nombres exactos como pediste: puestoTrabajoService)
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
    return this.${serviceVar}Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${serviceVar}Service.findOne(+id);
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
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [${className}Controller],
  providers: [${className}Service, PrismaService],
})
export class ${className}Module {}
`;
  fs.writeFileSync(path.join(folderPath, `${fileName}.module.ts`), moduleFile);

  // Service (usa prisma.${modelName} exactamente, con guiones bajos si existen)
  const service = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create${className}Dto } from './dto/create-${fileName}.dto';
import { Update${className}Dto } from './dto/update-${fileName}.dto';

@Injectable()
export class ${className}Service {
  constructor(private prisma: PrismaService) {}

  create(create${className}Dto: Create${className}Dto) {
    return this.prisma.${prismaModel}.create({ data: create${className}Dto });
  }

  findAll() {
    return this.prisma.${prismaModel}.findMany();
  }

  findOne(id: number) {
    return this.prisma.${prismaModel}.findUnique({ where: { ${pkField}: id } });
  }

  update(id: number, update${className}Dto: Update${className}Dto) {
    return this.prisma.${prismaModel}.update({
      where: { ${pkField}: id },
      data: update${className}Dto,
    });
  }

  remove(id: number) {
    return this.prisma.${prismaModel}.delete({ where: { ${pkField}: id } });
  }
}
`;
  fs.writeFileSync(path.join(folderPath, `${fileName}.service.ts`), service);

  // (Opcional) Specs básicos
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

  console.log(`✅ Generated resources for model: ${modelName}`);
}
