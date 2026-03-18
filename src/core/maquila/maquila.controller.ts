import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaquilaService } from './maquila.service';
import { CreateMaquilaDto } from './dto/create-maquila.dto';
import { UpdateMaquilaDto } from './dto/update-maquila.dto';

@Controller('maquila')
export class MaquilaController {
  constructor(private readonly maquilaService: MaquilaService) {}

  @Post()
  create(@Body() createMaquilaDto: CreateMaquilaDto) {
    return this.maquilaService.create(createMaquilaDto);
  }

  @Get()
  findAll() {
    return this.maquilaService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maquilaService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaquilaDto: UpdateMaquilaDto) {
    return this.maquilaService.update(+id, updateMaquilaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maquilaService.remove(+id);
  }
}
