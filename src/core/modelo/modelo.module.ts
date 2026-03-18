import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ModeloController],
  providers: [ModeloService, PrismaService],
})
export class ModeloModule {}
