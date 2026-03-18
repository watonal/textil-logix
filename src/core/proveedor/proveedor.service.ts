import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedorService {
  constructor(private prisma: PrismaService) {}

  
  async create(createProveedorDto: CreateProveedorDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.proveedor.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createProveedorDto.codigo) {
        const dtoCodigoNum = BigInt(createProveedorDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createProveedorDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createProveedorDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.proveedor.create({ data: createProveedorDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.proveedor.findMany({ include: includeRelations ? { calle: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.proveedor.findUnique({
      where: { id_proveedor: id }, include: includeRelations ? { calle: true } : undefined
    });
  }

  update(id: number, updateProveedorDto: UpdateProveedorDto) {
    return this.prisma.proveedor.update({
      where: { id_proveedor: id },
      data: updateProveedorDto,
    });
  }

  remove(id: number) {
    return this.prisma.proveedor.delete({ where: { id_proveedor: id } });
  }
}
