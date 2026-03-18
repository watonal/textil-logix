import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';

@Injectable()
export class PermisoService {
  constructor(private prisma: PrismaService) {}

  create(createPermisoDto: CreatePermisoDto) {
    return this.prisma.permiso.create({ data: createPermisoDto });
  }

  findAll(includeRelations = false) {
    return this.prisma.permiso.findMany({ include: includeRelations ? { usuario: true, modulo: true } : undefined });
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.permiso.findUnique({
      where: { id_permiso: id }, include: includeRelations ? { usuario: true, modulo: true } : undefined
    });
  }

  update(id: number, updatePermisoDto: UpdatePermisoDto) {
    return this.prisma.permiso.update({
      where: { id_permiso: id },
      data: updatePermisoDto,
    });
  }

  remove(id: number) {
    return this.prisma.permiso.delete({ where: { id_permiso: id } });
  }
}
