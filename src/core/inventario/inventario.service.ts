import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';

@Injectable()
export class InventarioService {
  constructor(private prisma: PrismaService) {}

  
  async create(createInventarioDto: CreateInventarioDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.inventario.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createInventarioDto.codigo) {
        const dtoCodigoNum = BigInt(createInventarioDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createInventarioDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createInventarioDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.inventario.create({ data: createInventarioDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.inventario.findMany({ include: includeRelations ? { detalle_venta: true, modelo: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.inventario.findUnique({
      where: { id_inventario: id }, include: includeRelations ? { detalle_venta: true, modelo: true } : undefined
    });
  }

  update(id: number, updateInventarioDto: UpdateInventarioDto) {
    return this.prisma.inventario.update({
      where: { id_inventario: id },
      data: updateInventarioDto,
    });
  }

  remove(id: number) {
    return this.prisma.inventario.delete({ where: { id_inventario: id } });
  }
}
