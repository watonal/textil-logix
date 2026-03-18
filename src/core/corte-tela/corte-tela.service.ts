import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCorteTelaDto } from './dto/create-corte-tela.dto';
import { UpdateCorteTelaDto } from './dto/update-corte-tela.dto';

@Injectable()
export class CorteTelaService {
  constructor(private prisma: PrismaService) {}

  
  async create(createCorteTelaDto: CreateCorteTelaDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.corte_tela.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createCorteTelaDto.codigo) {
        const dtoCodigoNum = BigInt(createCorteTelaDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createCorteTelaDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createCorteTelaDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.corte_tela.create({ data: createCorteTelaDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.corte_tela.findMany({ include: includeRelations ? { corte: true, almacen: true, estatus_tendida: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.corte_tela.findUnique({
      where: { id_corte_tela: id }, include: includeRelations ? { corte: true, almacen: true, estatus_tendida: true } : undefined
    });
  }

  update(id: number, updateCorteTelaDto: UpdateCorteTelaDto) {
    return this.prisma.corte_tela.update({
      where: { id_corte_tela: id },
      data: updateCorteTelaDto,
    });
  }

  remove(id: number) {
    return this.prisma.corte_tela.delete({ where: { id_corte_tela: id } });
  }
}
