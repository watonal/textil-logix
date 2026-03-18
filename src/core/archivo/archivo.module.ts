import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ArchivoController],
  providers: [ArchivoService, PrismaService],
})
export class ArchivoModule {}
