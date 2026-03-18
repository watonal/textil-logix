import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Injectable()
export class ModuloService {
  constructor(private prisma: PrismaService) {}

  
  async create(createModuloDto: CreateModuloDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.modulo.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createModuloDto.codigo) {
        const dtoCodigoNum = BigInt(createModuloDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createModuloDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createModuloDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.modulo.create({ data: createModuloDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.modulo.findMany({ include: includeRelations ? { permiso: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.modulo.findUnique({
      where: { id_modulo: id }, include: includeRelations ? { permiso: true } : undefined
    });
  }

  update(id: number, updateModuloDto: UpdateModuloDto) {
    return this.prisma.modulo.update({
      where: { id_modulo: id },
      data: updateModuloDto,
    });
  }

  remove(id: number) {
    return this.prisma.modulo.delete({ where: { id_modulo: id } });
  }
}
