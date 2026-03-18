import { Module } from '@nestjs/common';
import { TipoInsumoService } from './tipo-insumo.service';
import { TipoInsumoController } from './tipo-insumo.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TipoInsumoController],
  providers: [TipoInsumoService, PrismaService],
})
export class TipoInsumoModule {}
