import { Module } from '@nestjs/common';
import { EstatusTendidaService } from './estatus-tendida.service';
import { EstatusTendidaController } from './estatus-tendida.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [EstatusTendidaController],
  providers: [EstatusTendidaService, PrismaService],
})
export class EstatusTendidaModule {}
