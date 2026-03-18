import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';

@Injectable()
export class CompraService {
  constructor(private prisma: PrismaService) {}

  
  async create(createCompraDto: CreateCompraDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.compra.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createCompraDto.codigo) {
        const dtoCodigoNum = BigInt(createCompraDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createCompraDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createCompraDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.compra.create({ data: createCompraDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.compra.findMany({ include: includeRelations ? { detalle_compra: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.compra.findUnique({
      where: { id_compra: id }, include: includeRelations ? { detalle_compra: true } : undefined
    });
  }

  update(id: number, updateCompraDto: UpdateCompraDto) {
    return this.prisma.compra.update({
      where: { id_compra: id },
      data: updateCompraDto,
    });
  }

  remove(id: number) {
    return this.prisma.compra.delete({ where: { id_compra: id } });
  }
}
