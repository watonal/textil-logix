import { Module } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { AlmacenController } from './almacen.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [AlmacenController],
  providers: [AlmacenService, PrismaService],
})
export class AlmacenModule {}
