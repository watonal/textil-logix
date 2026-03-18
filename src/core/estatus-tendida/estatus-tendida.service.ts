import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEstatusTendidaDto } from './dto/create-estatus-tendida.dto';
import { UpdateEstatusTendidaDto } from './dto/update-estatus-tendida.dto';

@Injectable()
export class EstatusTendidaService {
  constructor(private prisma: PrismaService) {}

  
  async create(createEstatusTendidaDto: CreateEstatusTendidaDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.estatus_tendida.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createEstatusTendidaDto.codigo) {
        const dtoCodigoNum = BigInt(createEstatusTendidaDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createEstatusTendidaDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createEstatusTendidaDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.estatus_tendida.create({ data: createEstatusTendidaDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.estatus_tendida.findMany({ include: includeRelations ? { corte_tela: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.estatus_tendida.findUnique({
      where: { id_estatus_tendida: id }, include: includeRelations ? { corte_tela: true } : undefined
    });
  }

  update(id: number, updateEstatusTendidaDto: UpdateEstatusTendidaDto) {
    return this.prisma.estatus_tendida.update({
      where: { id_estatus_tendida: id },
      data: updateEstatusTendidaDto,
    });
  }

  remove(id: number) {
    return this.prisma.estatus_tendida.delete({ where: { id_estatus_tendida: id } });
  }
}
