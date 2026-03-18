import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';

@Injectable()
export class UnidadService {
  constructor(private prisma: PrismaService) {}

  
  async create(createUnidadDto: CreateUnidadDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.unidad.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createUnidadDto.codigo) {
        const dtoCodigoNum = BigInt(createUnidadDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createUnidadDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createUnidadDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.unidad.create({ data: createUnidadDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.unidad.findMany({ include: includeRelations ? { almacen: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.unidad.findUnique({
      where: { id_unidad: id }, include: includeRelations ? { almacen: true } : undefined
    });
  }

  update(id: number, updateUnidadDto: UpdateUnidadDto) {
    return this.prisma.unidad.update({
      where: { id_unidad: id },
      data: updateUnidadDto,
    });
  }

  remove(id: number) {
    return this.prisma.unidad.delete({ where: { id_unidad: id } });
  }
}
