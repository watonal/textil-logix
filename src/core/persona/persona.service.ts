import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Injectable()
export class PersonaService {
  constructor(private prisma: PrismaService) {}

  
  async create(createPersonaDto: CreatePersonaDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.persona.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createPersonaDto.codigo) {
        const dtoCodigoNum = BigInt(createPersonaDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createPersonaDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createPersonaDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.persona.create({ data: createPersonaDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.persona.findMany({ include: includeRelations ? { entrega_maquila: true, puesto_trabajo: true, calle: true, usuario: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.persona.findUnique({
      where: { id_persona: id }, include: includeRelations ? { entrega_maquila: true, puesto_trabajo: true, calle: true, usuario: true } : undefined
    });
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return this.prisma.persona.update({
      where: { id_persona: id },
      data: updatePersonaDto,
    });
  }

  remove(id: number) {
    return this.prisma.persona.delete({ where: { id_persona: id } });
  }
}
