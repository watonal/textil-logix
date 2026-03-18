import { Module } from '@nestjs/common';
import { LocalidadService } from './localidad.service';
import { LocalidadController } from './localidad.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [LocalidadController],
  providers: [LocalidadService, PrismaService],
})
export class LocalidadModule {}
