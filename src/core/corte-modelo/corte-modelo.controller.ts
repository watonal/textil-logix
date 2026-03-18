import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorteModeloService } from './corte-modelo.service';
import { CreateCorteModeloDto } from './dto/create-corte-modelo.dto';
import { UpdateCorteModeloDto } from './dto/update-corte-modelo.dto';

@Controller('corte-modelo')
export class CorteModeloController {
  constructor(private readonly cortemodeloService: CorteModeloService) {}

  @Post()
  create(@Body() createCorteModeloDto: CreateCorteModeloDto) {
    return this.cortemodeloService.create(createCorteModeloDto);
  }

  @Get()
  findAll() {
    return this.cortemodeloService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cortemodeloService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorteModeloDto: UpdateCorteModeloDto) {
    return this.cortemodeloService.update(+id, updateCorteModeloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cortemodeloService.remove(+id);
  }
}
