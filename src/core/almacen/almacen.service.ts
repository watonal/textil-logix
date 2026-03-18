import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';

@Injectable()
export class AlmacenService {
  constructor(private prisma: PrismaService) {}

  
  async create(createAlmacenDto: CreateAlmacenDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.almacen.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createAlmacenDto.codigo) {
        const dtoCodigoNum = BigInt(createAlmacenDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createAlmacenDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createAlmacenDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.almacen.create({ data: createAlmacenDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.almacen.findMany({ include: includeRelations ? { accesorio: true, unidad: true, tipo_insumo: true, corte_tela: true, detalle_compra: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.almacen.findUnique({
      where: { id_almacen: id }, include: includeRelations ? { accesorio: true, unidad: true, tipo_insumo: true, corte_tela: true, detalle_compra: true } : undefined
    });
  }

  update(id: number, updateAlmacenDto: UpdateAlmacenDto) {
    return this.prisma.almacen.update({
      where: { id_almacen: id },
      data: updateAlmacenDto,
    });
  }

  remove(id: number) {
    return this.prisma.almacen.delete({ where: { id_almacen: id } });
  }
}
