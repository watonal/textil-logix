import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';

@Injectable()
export class ModeloService {
  constructor(private prisma: PrismaService) {}

  
  async create(createModeloDto: CreateModeloDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.modelo.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createModeloDto.codigo) {
        const dtoCodigoNum = BigInt(createModeloDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createModeloDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createModeloDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.modelo.create({ data: createModeloDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.modelo.findMany({ include: includeRelations ? { accesorio: true, corte_modelo: true, detalle_modelo: true, inventario: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.modelo.findUnique({
      where: { id_modelo: id }, include: includeRelations ? { accesorio: true, corte_modelo: true, detalle_modelo: true, inventario: true } : undefined
    });
  }

  update(id: number, updateModeloDto: UpdateModeloDto) {
    return this.prisma.modelo.update({
      where: { id_modelo: id },
      data: updateModeloDto,
    });
  }

  remove(id: number) {
    return this.prisma.modelo.delete({ where: { id_modelo: id } });
  }
}
