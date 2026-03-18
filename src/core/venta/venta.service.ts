import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentaService {
  constructor(private prisma: PrismaService) {}

  
  async create(createVentaDto: CreateVentaDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.venta.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createVentaDto.codigo) {
        const dtoCodigoNum = BigInt(createVentaDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createVentaDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createVentaDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.venta.create({ data: createVentaDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.venta.findMany({ include: includeRelations ? { detalle_venta: true, usuario: true, plazas: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.venta.findUnique({
      where: { id_venta: id }, include: includeRelations ? { detalle_venta: true, usuario: true, plazas: true } : undefined
    });
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return this.prisma.venta.update({
      where: { id_venta: id },
      data: updateVentaDto,
    });
  }

  remove(id: number) {
    return this.prisma.venta.delete({ where: { id_venta: id } });
  }
}
