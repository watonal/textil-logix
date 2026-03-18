import { Module } from '@nestjs/common';
import { EntregaMaquilaService } from './entrega-maquila.service';
import { EntregaMaquilaController } from './entrega-maquila.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [EntregaMaquilaController],
  providers: [EntregaMaquilaService, PrismaService],
})
export class EntregaMaquilaModule {}
