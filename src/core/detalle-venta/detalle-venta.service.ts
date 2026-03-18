import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';

@Injectable()
export class DetalleVentaService {
  constructor(private prisma: PrismaService) {}

  create(createDetalleVentaDto: CreateDetalleVentaDto) {
    return this.prisma.detalle_venta.create({ data: createDetalleVentaDto });
  }

  findAll(includeRelations = false) {
    return this.prisma.detalle_venta.findMany({ include: includeRelations ? { venta: true, inventario: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.detalle_venta.findUnique({
      where: { id_detalle_venta: id }, include: includeRelations ? { venta: true, inventario: true } : undefined
    });
  }

  update(id: number, updateDetalleVentaDto: UpdateDetalleVentaDto) {
    return this.prisma.detalle_venta.update({
      where: { id_detalle_venta: id },
      data: updateDetalleVentaDto,
    });
  }

  remove(id: number) {
    return this.prisma.detalle_venta.delete({ where: { id_detalle_venta: id } });
  }
}
