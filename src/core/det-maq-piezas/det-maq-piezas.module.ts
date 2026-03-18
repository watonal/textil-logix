import { Module } from '@nestjs/common';
import { DetMaqPiezasService } from './det-maq-piezas.service';
import { DetMaqPiezasController } from './det-maq-piezas.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DetMaqPiezasController],
  providers: [DetMaqPiezasService, PrismaService],
})
export class DetMaqPiezasModule {}
