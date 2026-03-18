import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMaquildorDto } from './dto/create-maquildor.dto';
import { UpdateMaquildorDto } from './dto/update-maquildor.dto';

@Injectable()
export class MaquildorService {
  constructor(private prisma: PrismaService) {}

  
  async create(createMaquildorDto: CreateMaquildorDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.maquildor.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createMaquildorDto.codigo) {
        const dtoCodigoNum = BigInt(createMaquildorDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createMaquildorDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createMaquildorDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.maquildor.create({ data: createMaquildorDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.maquildor.findMany({ include: includeRelations ? { maquila: true, calle: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.maquildor.findUnique({
      where: { id_maquilador: id }, include: includeRelations ? { maquila: true, calle: true } : undefined
    });
  }

  update(id: number, updateMaquildorDto: UpdateMaquildorDto) {
    return this.prisma.maquildor.update({
      where: { id_maquilador: id },
      data: updateMaquildorDto,
    });
  }

  remove(id: number) {
    return this.prisma.maquildor.delete({ where: { id_maquilador: id } });
  }
}
