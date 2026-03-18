import { Module } from '@nestjs/common';
import { CorteService } from './corte.service';
import { CorteController } from './corte.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CorteController],
  providers: [CorteService, PrismaService],
})
export class CorteModule {}
