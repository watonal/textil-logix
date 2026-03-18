import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDetalleModeloDto } from './dto/create-detalle-modelo.dto';
import { UpdateDetalleModeloDto } from './dto/update-detalle-modelo.dto';

@Injectable()
export class DetalleModeloService {
  constructor(private prisma: PrismaService) {}

  
  async create(createDetalleModeloDto: CreateDetalleModeloDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.detalle_modelo.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createDetalleModeloDto.codigo) {
        const dtoCodigoNum = BigInt(createDetalleModeloDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createDetalleModeloDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createDetalleModeloDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.detalle_modelo.create({ data: createDetalleModeloDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.detalle_modelo.findMany({ include: includeRelations ? { modelo: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.detalle_modelo.findUnique({
      where: { id_detalle_modelo: id }, include: includeRelations ? { modelo: true } : undefined
    });
  }

  update(id: number, updateDetalleModeloDto: UpdateDetalleModeloDto) {
    return this.prisma.detalle_modelo.update({
      where: { id_detalle_modelo: id },
      data: updateDetalleModeloDto,
    });
  }

  remove(id: number) {
    return this.prisma.detalle_modelo.delete({ where: { id_detalle_modelo: id } });
  }
}
