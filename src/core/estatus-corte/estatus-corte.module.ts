import { Module } from '@nestjs/common';
import { EstatusCorteService } from './estatus-corte.service';
import { EstatusCorteController } from './estatus-corte.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [EstatusCorteController],
  providers: [EstatusCorteService, PrismaService],
})
export class EstatusCorteModule {}
