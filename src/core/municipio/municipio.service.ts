import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';

@Injectable()
export class MunicipioService {
  constructor(private prisma: PrismaService) {}

  
  async create(createMunicipioDto: CreateMunicipioDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.municipio.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createMunicipioDto.codigo) {
        const dtoCodigoNum = BigInt(createMunicipioDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createMunicipioDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createMunicipioDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.municipio.create({ data: createMunicipioDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.municipio.findMany({ include: includeRelations ? { localidad: true, estado: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.municipio.findUnique({
      where: { id_municipio: id }, include: includeRelations ? { localidad: true, estado: true } : undefined
    });
  }

  update(id: number, updateMunicipioDto: UpdateMunicipioDto) {
    return this.prisma.municipio.update({
      where: { id_municipio: id },
      data: updateMunicipioDto,
    });
  }

  remove(id: number) {
    return this.prisma.municipio.delete({ where: { id_municipio: id } });
  }
}
