import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePuestoTrabajoDto } from './dto/create-puesto-trabajo.dto';
import { UpdatePuestoTrabajoDto } from './dto/update-puesto-trabajo.dto';

@Injectable()
export class PuestoTrabajoService {
  constructor(private prisma: PrismaService) {}

  
  async create(createPuestoTrabajoDto: CreatePuestoTrabajoDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.puesto_trabajo.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createPuestoTrabajoDto.codigo) {
        const dtoCodigoNum = BigInt(createPuestoTrabajoDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createPuestoTrabajoDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createPuestoTrabajoDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.puesto_trabajo.create({ data: createPuestoTrabajoDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.puesto_trabajo.findMany({ include: includeRelations ? { persona: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.puesto_trabajo.findUnique({
      where: { id_puesto: id }, include: includeRelations ? { persona: true } : undefined
    });
  }

  update(id: number, updatePuestoTrabajoDto: UpdatePuestoTrabajoDto) {
    return this.prisma.puesto_trabajo.update({
      where: { id_puesto: id },
      data: updatePuestoTrabajoDto,
    });
  }

  remove(id: number) {
    return this.prisma.puesto_trabajo.delete({ where: { id_puesto: id } });
  }
}
