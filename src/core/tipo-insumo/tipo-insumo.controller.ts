import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoInsumoService } from './tipo-insumo.service';
import { CreateTipoInsumoDto } from './dto/create-tipo-insumo.dto';
import { UpdateTipoInsumoDto } from './dto/update-tipo-insumo.dto';

@Controller('tipo-insumo')
export class TipoInsumoController {
  constructor(private readonly tipoinsumoService: TipoInsumoService) {}

  @Post()
  create(@Body() createTipoInsumoDto: CreateTipoInsumoDto) {
    return this.tipoinsumoService.create(createTipoInsumoDto);
  }

  @Get()
  findAll() {
    return this.tipoinsumoService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoinsumoService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoInsumoDto: UpdateTipoInsumoDto) {
    return this.tipoinsumoService.update(+id, updateTipoInsumoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoinsumoService.remove(+id);
  }
}
