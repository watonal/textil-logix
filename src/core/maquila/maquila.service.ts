import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMaquilaDto } from './dto/create-maquila.dto';
import { UpdateMaquilaDto } from './dto/update-maquila.dto';

@Injectable()
export class MaquilaService {
  constructor(private prisma: PrismaService) {}

  
  async create(createMaquilaDto: CreateMaquilaDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.maquila.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createMaquilaDto.codigo) {
        const dtoCodigoNum = BigInt(createMaquilaDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createMaquilaDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createMaquilaDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.maquila.create({ data: createMaquilaDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.maquila.findMany({ include: includeRelations ? { detalle_maquila: true, maquildor: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.maquila.findUnique({
      where: { id_maquila: id }, include: includeRelations ? { detalle_maquila: true, maquildor: true } : undefined
    });
  }

  update(id: number, updateMaquilaDto: UpdateMaquilaDto) {
    return this.prisma.maquila.update({
      where: { id_maquila: id },
      data: updateMaquilaDto,
    });
  }

  remove(id: number) {
    return this.prisma.maquila.delete({ where: { id_maquila: id } });
  }
}
