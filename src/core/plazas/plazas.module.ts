import { Module } from '@nestjs/common';
import { PlazasService } from './plazas.service';
import { PlazasController } from './plazas.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [PlazasController],
  providers: [PlazasService, PrismaService],
})
export class PlazasModule {}
