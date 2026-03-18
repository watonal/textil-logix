import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccesorioDto } from './dto/create-accesorio.dto';
import { UpdateAccesorioDto } from './dto/update-accesorio.dto';

@Injectable()
export class AccesorioService {
  constructor(private prisma: PrismaService) {}

  
  async create(createAccesorioDto: CreateAccesorioDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.accesorio.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createAccesorioDto.codigo) {
        const dtoCodigoNum = BigInt(createAccesorioDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createAccesorioDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createAccesorioDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.accesorio.create({ data: createAccesorioDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.accesorio.findMany({ include: includeRelations ? { modelo: true, almacen: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.accesorio.findUnique({
      where: { id_accesorio: id }, include: includeRelations ? { modelo: true, almacen: true } : undefined
    });
  }

  update(id: number, updateAccesorioDto: UpdateAccesorioDto) {
    return this.prisma.accesorio.update({
      where: { id_accesorio: id },
      data: updateAccesorioDto,
    });
  }

  remove(id: number) {
    return this.prisma.accesorio.delete({ where: { id_accesorio: id } });
  }
}
