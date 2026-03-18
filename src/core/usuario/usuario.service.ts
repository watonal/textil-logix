import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  
  async create(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Obtiene todos los códigos existentes
      const allCodigos = await prisma.usuario.findMany({
        select: { codigo: true },
      });

      // Filtra solo los numéricos puros
      const numericCodigos = allCodigos
        .map(c => c.codigo)
        .filter(c => /^\d+$/.test(c))
        .map(c => BigInt(c));

      // Si el DTO ya tiene código, aseguramos que no se repita
      if (createUsuarioDto.codigo) {
        const dtoCodigoNum = BigInt(createUsuarioDto.codigo);
        if (numericCodigos.includes(dtoCodigoNum)) {
          let maxCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) : BigInt(0);
          createUsuarioDto.codigo = (maxCodigo + BigInt(1)).toString().padStart(20,'0');
        }
      } else {
        // No trae código, genera el siguiente
        let nextCodigo = numericCodigos.length ? numericCodigos.reduce((a,b)=> a>b?a:b) + BigInt(1) : BigInt(1);
        createUsuarioDto.codigo = nextCodigo.toString().padStart(20,'0');
      }

      return prisma.usuario.create({ data: createUsuarioDto });
    });
  }

  findAll(includeRelations = false) {
    return this.prisma.usuario.findMany({ include: includeRelations ? { corte: true, permiso: true, persona: true, venta: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.usuario.findUnique({
      where: { id_usuario: id }, include: includeRelations ? { corte: true, permiso: true, persona: true, venta: true } : undefined
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: { id_usuario: id },
      data: updateUsuarioDto,
    });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id_usuario: id } });
  }
}
