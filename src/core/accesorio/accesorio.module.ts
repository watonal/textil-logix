import { Module } from '@nestjs/common';
import { AccesorioService } from './accesorio.service';
import { AccesorioController } from './accesorio.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [AccesorioController],
  providers: [AccesorioService, PrismaService],
})
export class AccesorioModule {}
