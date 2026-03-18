import { Module } from '@nestjs/common';
import { MaquilaService } from './maquila.service';
import { MaquilaController } from './maquila.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [MaquilaController],
  providers: [MaquilaService, PrismaService],
})
export class MaquilaModule {}
