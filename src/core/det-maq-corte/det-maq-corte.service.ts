import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDetMaqCorteDto } from './dto/create-det-maq-corte.dto';
import { UpdateDetMaqCorteDto } from './dto/update-det-maq-corte.dto';

@Injectable()
export class DetMaqCorteService {
  constructor(private prisma: PrismaService) {}

  create(createDetMaqCorteDto: CreateDetMaqCorteDto) {
    return this.prisma.det_maq_corte.create({ data: createDetMaqCorteDto });
  }

  findAll(includeRelations = false) {
    return this.prisma.det_maq_corte.findMany({ include: includeRelations ? { detalle_maquila: true, corte_modelo: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.det_maq_corte.findUnique({
      where: { id_det_maq_corte: id }, include: includeRelations ? { detalle_maquila: true, corte_modelo: true } : undefined
    });
  }

  update(id: number, updateDetMaqCorteDto: UpdateDetMaqCorteDto) {
    return this.prisma.det_maq_corte.update({
      where: { id_det_maq_corte: id },
      data: updateDetMaqCorteDto,
    });
  }

  remove(id: number) {
    return this.prisma.det_maq_corte.delete({ where: { id_det_maq_corte: id } });
  }
}
