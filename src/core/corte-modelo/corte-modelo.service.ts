import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCorteModeloDto } from './dto/create-corte-modelo.dto';
import { UpdateCorteModeloDto } from './dto/update-corte-modelo.dto';

@Injectable()
export class CorteModeloService {
  constructor(private prisma: PrismaService) {}

  
  async create(createCorteModeloDto: CreateCorteModeloDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.corte_modelo.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createCorteModeloDto.codigo) {
        const dtoCodigoNum = BigInt(createCorteModeloDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createCorteModeloDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createCorteModeloDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.corte_modelo.create({ data: createCorteModeloDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.corte_modelo.findMany({ include: includeRelations ? { corte: true, modelo: true, corte_modelo_piezas: true, det_maq_corte: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.corte_modelo.findUnique({
      where: { id_corte_modelo: id }, include: includeRelations ? { corte: true, modelo: true, corte_modelo_piezas: true, det_maq_corte: true } : undefined
    });
  }

  update(id: number, updateCorteModeloDto: UpdateCorteModeloDto) {
    return this.prisma.corte_modelo.update({
      where: { id_corte_modelo: id },
      data: updateCorteModeloDto,
    });
  }

  remove(id: number) {
    return this.prisma.corte_modelo.delete({ where: { id_corte_modelo: id } });
  }
}
