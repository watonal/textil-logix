import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEstatusCorteDto } from './dto/create-estatus-corte.dto';
import { UpdateEstatusCorteDto } from './dto/update-estatus-corte.dto';

@Injectable()
export class EstatusCorteService {
  constructor(private prisma: PrismaService) {}

  
  async create(createEstatusCorteDto: CreateEstatusCorteDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.estatus_corte.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createEstatusCorteDto.codigo) {
        const dtoCodigoNum = BigInt(createEstatusCorteDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createEstatusCorteDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createEstatusCorteDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.estatus_corte.create({ data: createEstatusCorteDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.estatus_corte.findMany({ include: includeRelations ? { corte: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.estatus_corte.findUnique({
      where: { id_estatus_corte: id }, include: includeRelations ? { corte: true } : undefined
    });
  }

  update(id: number, updateEstatusCorteDto: UpdateEstatusCorteDto) {
    return this.prisma.estatus_corte.update({
      where: { id_estatus_corte: id },
      data: updateEstatusCorteDto,
    });
  }

  remove(id: number) {
    return this.prisma.estatus_corte.delete({ where: { id_estatus_corte: id } });
  }
}
