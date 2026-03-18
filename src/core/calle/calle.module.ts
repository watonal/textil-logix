import { Module } from '@nestjs/common';
import { CalleService } from './calle.service';
import { CalleController } from './calle.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CalleController],
  providers: [CalleService, PrismaService],
})
export class CalleModule {}
