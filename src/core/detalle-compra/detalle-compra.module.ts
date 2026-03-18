import { Module } from '@nestjs/common';
import { DetalleCompraService } from './detalle-compra.service';
import { DetalleCompraController } from './detalle-compra.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DetalleCompraController],
  providers: [DetalleCompraService, PrismaService],
})
export class DetalleCompraModule {}
