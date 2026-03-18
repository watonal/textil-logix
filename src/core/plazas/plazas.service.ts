import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlazasDto } from './dto/create-plazas.dto';
import { UpdatePlazasDto } from './dto/update-plazas.dto';

@Injectable()
export class PlazasService {
  constructor(private prisma: PrismaService) {}

  
  async create(createPlazasDto: CreatePlazasDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.plazas.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createPlazasDto.codigo) {
        const dtoCodigoNum = BigInt(createPlazasDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createPlazasDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createPlazasDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.plazas.create({ data: createPlazasDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.plazas.findMany({ include: includeRelations ? { venta: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.plazas.findUnique({
      where: { id_plaza: id }, include: includeRelations ? { venta: true } : undefined
    });
  }

  update(id: number, updatePlazasDto: UpdatePlazasDto) {
    return this.prisma.plazas.update({
      where: { id_plaza: id },
      data: updatePlazasDto,
    });
  }

  remove(id: number) {
    return this.prisma.plazas.delete({ where: { id_plaza: id } });
  }
}
