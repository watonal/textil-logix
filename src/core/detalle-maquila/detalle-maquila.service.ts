import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDetalleMaquilaDto } from './dto/create-detalle-maquila.dto';
import { UpdateDetalleMaquilaDto } from './dto/update-detalle-maquila.dto';

@Injectable()
export class DetalleMaquilaService {
  constructor(private prisma: PrismaService) {}

  create(createDetalleMaquilaDto: CreateDetalleMaquilaDto) {
    return this.prisma.detalle_maquila.create({ data: createDetalleMaquilaDto });
  }

  findAll(includeRelations = false) {
    return this.prisma.detalle_maquila.findMany({ include: includeRelations ? { det_maq_corte: true, det_maq_piezas: true, maquila: true, entrega_maquila: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.detalle_maquila.findUnique({
      where: { id_detalle_maquila: id }, include: includeRelations ? { det_maq_corte: true, det_maq_piezas: true, maquila: true, entrega_maquila: true } : undefined
    });
  }

  update(id: number, updateDetalleMaquilaDto: UpdateDetalleMaquilaDto) {
    return this.prisma.detalle_maquila.update({
      where: { id_detalle_maquila: id },
      data: updateDetalleMaquilaDto,
    });
  }

  remove(id: number) {
    return this.prisma.detalle_maquila.delete({ where: { id_detalle_maquila: id } });
  }
}
