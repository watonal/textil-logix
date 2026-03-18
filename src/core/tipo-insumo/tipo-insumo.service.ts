import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTipoInsumoDto } from './dto/create-tipo-insumo.dto';
import { UpdateTipoInsumoDto } from './dto/update-tipo-insumo.dto';

@Injectable()
export class TipoInsumoService {
  constructor(private prisma: PrismaService) {}

  
  async create(createTipoInsumoDto: CreateTipoInsumoDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.tipo_insumo.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createTipoInsumoDto.codigo) {
        const dtoCodigoNum = BigInt(createTipoInsumoDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createTipoInsumoDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createTipoInsumoDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.tipo_insumo.create({ data: createTipoInsumoDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.tipo_insumo.findMany({ include: includeRelations ? { almacen: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.tipo_insumo.findUnique({
      where: { id_tipo_insumo: id }, include: includeRelations ? { almacen: true } : undefined
    });
  }

  update(id: number, updateTipoInsumoDto: UpdateTipoInsumoDto) {
    return this.prisma.tipo_insumo.update({
      where: { id_tipo_insumo: id },
      data: updateTipoInsumoDto,
    });
  }

  remove(id: number) {
    return this.prisma.tipo_insumo.delete({ where: { id_tipo_insumo: id } });
  }
}
