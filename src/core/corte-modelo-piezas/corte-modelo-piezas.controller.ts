import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorteModeloPiezasService } from './corte-modelo-piezas.service';
import { CreateCorteModeloPiezasDto } from './dto/create-corte-modelo-piezas.dto';
import { UpdateCorteModeloPiezasDto } from './dto/update-corte-modelo-piezas.dto';

@Controller('corte-modelo-piezas')
export class CorteModeloPiezasController {
  constructor(private readonly cortemodelopiezasService: CorteModeloPiezasService) {}

  @Post()
  create(@Body() createCorteModeloPiezasDto: CreateCorteModeloPiezasDto) {
    return this.cortemodelopiezasService.create(createCorteModeloPiezasDto);
  }

  @Get()
  findAll() {
    return this.cortemodelopiezasService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cortemodelopiezasService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorteModeloPiezasDto: UpdateCorteModeloPiezasDto) {
    return this.cortemodelopiezasService.update(+id, updateCorteModeloPiezasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cortemodelopiezasService.remove(+id);
  }
}
