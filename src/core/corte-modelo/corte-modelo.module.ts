import { Module } from '@nestjs/common';
import { CorteModeloService } from './corte-modelo.service';
import { CorteModeloController } from './corte-modelo.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CorteModeloController],
  providers: [CorteModeloService, PrismaService],
})
export class CorteModeloModule {}
