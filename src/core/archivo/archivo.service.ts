import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';

@Injectable()
export class ArchivoService {
  constructor(private prisma: PrismaService) {}

  create(createArchivoDto: CreateArchivoDto) {
    return this.prisma.archivo.create({ data: createArchivoDto });
  }

  findAll(includeRelations = false) {
    return this.prisma.archivo.findMany();
  }

  findOne(id: number, includeRelations = false) {
    return this.prisma.archivo.findUnique({
      where: { id_archivo: id }
    });
  }

  update(id: number, updateArchivoDto: UpdateArchivoDto) {
    return this.prisma.archivo.update({
      where: { id_archivo: id },
      data: updateArchivoDto,
    });
  }

  remove(id: number) {
    return this.prisma.archivo.delete({ where: { id_archivo: id } });
  }
}
