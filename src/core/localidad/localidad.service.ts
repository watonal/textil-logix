import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';

@Injectable()
export class LocalidadService {
  constructor(private prisma: PrismaService) {}

  
  async create(createLocalidadDto: CreateLocalidadDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.localidad.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createLocalidadDto.codigo) {
        const dtoCodigoNum = BigInt(createLocalidadDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createLocalidadDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createLocalidadDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.localidad.create({ data: createLocalidadDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.localidad.findMany({ include: includeRelations ? { colonia: true, municipio: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.localidad.findUnique({
      where: { id_localidad: id }, include: includeRelations ? { colonia: true, municipio: true } : undefined
    });
  }

  update(id: number, updateLocalidadDto: UpdateLocalidadDto) {
    return this.prisma.localidad.update({
      where: { id_localidad: id },
      data: updateLocalidadDto,
    });
  }

  remove(id: number) {
    return this.prisma.localidad.delete({ where: { id_localidad: id } });
  }
}
