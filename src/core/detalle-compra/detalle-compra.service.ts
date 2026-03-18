import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDetalleCompraDto } from './dto/create-detalle-compra.dto';
import { UpdateDetalleCompraDto } from './dto/update-detalle-compra.dto';

@Injectable()
export class DetalleCompraService {
  constructor(private prisma: PrismaService) {}

  
  async create(createDetalleCompraDto: CreateDetalleCompraDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.detalle_compra.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createDetalleCompraDto.codigo) {
        const dtoCodigoNum = BigInt(createDetalleCompraDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createDetalleCompraDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createDetalleCompraDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.detalle_compra.create({ data: createDetalleCompraDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.detalle_compra.findMany({ include: includeRelations ? { compra: true, almacen: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.detalle_compra.findUnique({
      where: { id_detalle_compra: id }, include: includeRelations ? { compra: true, almacen: true } : undefined
    });
  }

  update(id: number, updateDetalleCompraDto: UpdateDetalleCompraDto) {
    return this.prisma.detalle_compra.update({
      where: { id_detalle_compra: id },
      data: updateDetalleCompraDto,
    });
  }

  remove(id: number) {
    return this.prisma.detalle_compra.delete({ where: { id_detalle_compra: id } });
  }
}
