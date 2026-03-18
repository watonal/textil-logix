import { Module } from '@nestjs/common';
import { DetalleModeloService } from './detalle-modelo.service';
import { DetalleModeloController } from './detalle-modelo.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DetalleModeloController],
  providers: [DetalleModeloService, PrismaService],
})
export class DetalleModeloModule {}
