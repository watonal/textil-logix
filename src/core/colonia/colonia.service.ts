import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateColoniaDto } from './dto/create-colonia.dto';
import { UpdateColoniaDto } from './dto/update-colonia.dto';

@Injectable()
export class ColoniaService {
  constructor(private prisma: PrismaService) {}

  
  async create(createColoniaDto: CreateColoniaDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.colonia.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createColoniaDto.codigo) {
        const dtoCodigoNum = BigInt(createColoniaDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createColoniaDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createColoniaDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.colonia.create({ data: createColoniaDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.colonia.findMany({ include: includeRelations ? { calle: true, localidad: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.colonia.findUnique({
      where: { id_colonia: id }, include: includeRelations ? { calle: true, localidad: true } : undefined
    });
  }

  update(id: number, updateColoniaDto: UpdateColoniaDto) {
    return this.prisma.colonia.update({
      where: { id_colonia: id },
      data: updateColoniaDto,
    });
  }

  remove(id: number) {
    return this.prisma.colonia.delete({ where: { id_colonia: id } });
  }
}
