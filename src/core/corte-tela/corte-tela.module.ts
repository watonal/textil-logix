import { Module } from '@nestjs/common';
import { CorteTelaService } from './corte-tela.service';
import { CorteTelaController } from './corte-tela.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CorteTelaController],
  providers: [CorteTelaService, PrismaService],
})
export class CorteTelaModule {}
