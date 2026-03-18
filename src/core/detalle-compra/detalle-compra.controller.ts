import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleCompraService } from './detalle-compra.service';
import { CreateDetalleCompraDto } from './dto/create-detalle-compra.dto';
import { UpdateDetalleCompraDto } from './dto/update-detalle-compra.dto';

@Controller('detalle-compra')
export class DetalleCompraController {
  constructor(private readonly detallecompraService: DetalleCompraService) {}

  @Post()
  create(@Body() createDetalleCompraDto: CreateDetalleCompraDto) {
    return this.detallecompraService.create(createDetalleCompraDto);
  }

  @Get()
  findAll() {
    return this.detallecompraService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallecompraService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleCompraDto: UpdateDetalleCompraDto) {
    return this.detallecompraService.update(+id, updateDetalleCompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallecompraService.remove(+id);
  }
}
