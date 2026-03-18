import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEntregaMaquilaDto } from './dto/create-entrega-maquila.dto';
import { UpdateEntregaMaquilaDto } from './dto/update-entrega-maquila.dto';

@Injectable()
export class EntregaMaquilaService {
  constructor(private prisma: PrismaService) {}

  
  async create(createEntregaMaquilaDto: CreateEntregaMaquilaDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.entrega_maquila.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createEntregaMaquilaDto.codigo) {
        const dtoCodigoNum = BigInt(createEntregaMaquilaDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createEntregaMaquilaDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createEntregaMaquilaDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.entrega_maquila.create({ data: createEntregaMaquilaDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.entrega_maquila.findMany({ include: includeRelations ? { detalle_maquila: true, persona: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.entrega_maquila.findUnique({
      where: { id_entrega: id }, include: includeRelations ? { detalle_maquila: true, persona: true } : undefined
    });
  }

  update(id: number, updateEntregaMaquilaDto: UpdateEntregaMaquilaDto) {
    return this.prisma.entrega_maquila.update({
      where: { id_entrega: id },
      data: updateEntregaMaquilaDto,
    });
  }

  remove(id: number) {
    return this.prisma.entrega_maquila.delete({ where: { id_entrega: id } });
  }
}
