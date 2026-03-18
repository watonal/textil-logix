import { Module } from '@nestjs/common';
import { CorteModeloPiezasService } from './corte-modelo-piezas.service';
import { CorteModeloPiezasController } from './corte-modelo-piezas.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CorteModeloPiezasController],
  providers: [CorteModeloPiezasService, PrismaService],
})
export class CorteModeloPiezasModule {}
