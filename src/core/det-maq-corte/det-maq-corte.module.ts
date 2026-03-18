import { Module } from '@nestjs/common';
import { DetMaqCorteService } from './det-maq-corte.service';
import { DetMaqCorteController } from './det-maq-corte.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DetMaqCorteController],
  providers: [DetMaqCorteService, PrismaService],
})
export class DetMaqCorteModule {}
