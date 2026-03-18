import { Module } from '@nestjs/common';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVentaController } from './detalle-venta.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DetalleVentaController],
  providers: [DetalleVentaService, PrismaService],
})
export class DetalleVentaModule {}
