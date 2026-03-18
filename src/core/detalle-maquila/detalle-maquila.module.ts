import { Module } from '@nestjs/common';
import { DetalleMaquilaService } from './detalle-maquila.service';
import { DetalleMaquilaController } from './detalle-maquila.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DetalleMaquilaController],
  providers: [DetalleMaquilaService, PrismaService],
})
export class DetalleMaquilaModule {}
