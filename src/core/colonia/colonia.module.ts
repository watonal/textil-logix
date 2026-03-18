import { Module } from '@nestjs/common';
import { ColoniaService } from './colonia.service';
import { ColoniaController } from './colonia.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ColoniaController],
  providers: [ColoniaService, PrismaService],
})
export class ColoniaModule {}
