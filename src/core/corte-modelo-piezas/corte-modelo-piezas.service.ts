import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCorteModeloPiezasDto } from './dto/create-corte-modelo-piezas.dto';
import { UpdateCorteModeloPiezasDto } from './dto/update-corte-modelo-piezas.dto';

@Injectable()
export class CorteModeloPiezasService {
  constructor(private prisma: PrismaService) {}

  create(createCorteModeloPiezasDto: CreateCorteModeloPiezasDto) {
    return this.prisma.corte_modelo_piezas.create({ data: createCorteModeloPiezasDto });
  }

  findAll(includeRelations = false) {
    return this.prisma.corte_modelo_piezas.findMany({ include: includeRelations ? { corte_modelo: true, det_maq_piezas: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.corte_modelo_piezas.findUnique({
      where: { id_corte_modelo_piezas: id }, include: includeRelations ? { corte_modelo: true, det_maq_piezas: true } : undefined
    });
  }

  update(id: number, updateCorteModeloPiezasDto: UpdateCorteModeloPiezasDto) {
    return this.prisma.corte_modelo_piezas.update({
      where: { id_corte_modelo_piezas: id },
      data: updateCorteModeloPiezasDto,
    });
  }

  remove(id: number) {
    return this.prisma.corte_modelo_piezas.delete({ where: { id_corte_modelo_piezas: id } });
  }
}
