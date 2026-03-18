import { Module } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [PermisoController],
  providers: [PermisoService, PrismaService],
})
export class PermisoModule {}
