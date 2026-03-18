import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCorteDto } from './dto/create-corte.dto';
import { UpdateCorteDto } from './dto/update-corte.dto';

@Injectable()
export class CorteService {
  constructor(private prisma: PrismaService) {}

  
  async create(createCorteDto: CreateCorteDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.corte.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createCorteDto.codigo) {
        const dtoCodigoNum = BigInt(createCorteDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createCorteDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createCorteDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.corte.create({ data: createCorteDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.corte.findMany({ include: includeRelations ? { usuario: true, estatus_corte: true, corte_modelo: true, corte_tela: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.corte.findUnique({
      where: { id_corte: id }, include: includeRelations ? { usuario: true, estatus_corte: true, corte_modelo: true, corte_tela: true } : undefined
    });
  }

  update(id: number, updateCorteDto: UpdateCorteDto) {
    return this.prisma.corte.update({
      where: { id_corte: id },
      data: updateCorteDto,
    });
  }

  remove(id: number) {
    return this.prisma.corte.delete({ where: { id_corte: id } });
  }
}
