import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstadoService {
  constructor(private prisma: PrismaService) {}

  
  async create(createEstadoDto: CreateEstadoDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.estado.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createEstadoDto.codigo) {
        const dtoCodigoNum = BigInt(createEstadoDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createEstadoDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createEstadoDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.estado.create({ data: createEstadoDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.estado.findMany({ include: includeRelations ? { municipio: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.estado.findUnique({
      where: { id_estado: id }, include: includeRelations ? { municipio: true } : undefined
    });
  }

  update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return this.prisma.estado.update({
      where: { id_estado: id },
      data: updateEstadoDto,
    });
  }

  remove(id: number) {
    return this.prisma.estado.delete({ where: { id_estado: id } });
  }
}
