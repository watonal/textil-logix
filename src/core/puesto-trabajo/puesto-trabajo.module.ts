import { Module } from '@nestjs/common';
import { PuestoTrabajoService } from './puesto-trabajo.service';
import { PuestoTrabajoController } from './puesto-trabajo.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [PuestoTrabajoController],
  providers: [PuestoTrabajoService, PrismaService],
})
export class PuestoTrabajoModule {}
