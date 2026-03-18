import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleModeloService } from './detalle-modelo.service';
import { CreateDetalleModeloDto } from './dto/create-detalle-modelo.dto';
import { UpdateDetalleModeloDto } from './dto/update-detalle-modelo.dto';

@Controller('detalle-modelo')
export class DetalleModeloController {
  constructor(private readonly detallemodeloService: DetalleModeloService) {}

  @Post()
  create(@Body() createDetalleModeloDto: CreateDetalleModeloDto) {
    return this.detallemodeloService.create(createDetalleModeloDto);
  }

  @Get()
  findAll() {
    return this.detallemodeloService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallemodeloService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleModeloDto: UpdateDetalleModeloDto) {
    return this.detallemodeloService.update(+id, updateDetalleModeloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallemodeloService.remove(+id);
  }
}
