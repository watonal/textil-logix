import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDetMaqPiezasDto } from './dto/create-det-maq-piezas.dto';
import { UpdateDetMaqPiezasDto } from './dto/update-det-maq-piezas.dto';

@Injectable()
export class DetMaqPiezasService {
  constructor(private prisma: PrismaService) {}

  create(createDetMaqPiezasDto: CreateDetMaqPiezasDto) {
    return this.prisma.det_maq_piezas.create({ data: createDetMaqPiezasDto });
  }

  findAll(includeRelations = false) {
    return this.prisma.det_maq_piezas.findMany({ include: includeRelations ? { detalle_maquila: true, corte_modelo_piezas: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.det_maq_piezas.findUnique({
      where: { id_det_maq_piezas: id }, include: includeRelations ? { detalle_maquila: true, corte_modelo_piezas: true } : undefined
    });
  }

  update(id: number, updateDetMaqPiezasDto: UpdateDetMaqPiezasDto) {
    return this.prisma.det_maq_piezas.update({
      where: { id_det_maq_piezas: id },
      data: updateDetMaqPiezasDto,
    });
  }

  remove(id: number) {
    return this.prisma.det_maq_piezas.delete({ where: { id_det_maq_piezas: id } });
  }
}
