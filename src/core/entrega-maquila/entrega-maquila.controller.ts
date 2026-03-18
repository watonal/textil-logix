import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntregaMaquilaService } from './entrega-maquila.service';
import { CreateEntregaMaquilaDto } from './dto/create-entrega-maquila.dto';
import { UpdateEntregaMaquilaDto } from './dto/update-entrega-maquila.dto';

@Controller('entrega-maquila')
export class EntregaMaquilaController {
  constructor(private readonly entregamaquilaService: EntregaMaquilaService) {}

  @Post()
  create(@Body() createEntregaMaquilaDto: CreateEntregaMaquilaDto) {
    return this.entregamaquilaService.create(createEntregaMaquilaDto);
  }

  @Get()
  findAll() {
    return this.entregamaquilaService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregamaquilaService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntregaMaquilaDto: UpdateEntregaMaquilaDto) {
    return this.entregamaquilaService.update(+id, updateEntregaMaquilaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregamaquilaService.remove(+id);
  }
}
