import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCalleDto } from './dto/create-calle.dto';
import { UpdateCalleDto } from './dto/update-calle.dto';

@Injectable()
export class CalleService {
  constructor(private prisma: PrismaService) {}

  
  async create(createCalleDto: CreateCalleDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.calle.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createCalleDto.codigo) {
        const dtoCodigoNum = BigInt(createCalleDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createCalleDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createCalleDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.calle.create({ data: createCalleDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.calle.findMany({ include: includeRelations ? { colonia: true, maquildor: true, persona: true, proveedor: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.calle.findUnique({
      where: { id_calle: id }, include: includeRelations ? { colonia: true, maquildor: true, persona: true, proveedor: true } : undefined
    });
  }

  update(id: number, updateCalleDto: UpdateCalleDto) {
    return this.prisma.calle.update({
      where: { id_calle: id },
      data: updateCalleDto,
    });
  }

  remove(id: number) {
    return this.prisma.calle.delete({ where: { id_calle: id } });
  }
}
