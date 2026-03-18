import { Module } from '@nestjs/common';
import { MaquildorService } from './maquildor.service';
import { MaquildorController } from './maquildor.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [MaquildorController],
  providers: [MaquildorService, PrismaService],
})
export class MaquildorModule {}
