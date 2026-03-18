import { Module } from '@nestjs/common';
import { GestionPuestosController } from './gestion-puestos.controller';
import { PuestoTrabajoService } from '../../core/puesto-trabajo/puesto-trabajo.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [GestionPuestosController],
  providers: [PuestoTrabajoService, PrismaService], // 👈 Importamos core aquí
})
export class GestionPuestosModule {}
