import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccesorioService } from './accesorio.service';
import { CreateAccesorioDto } from './dto/create-accesorio.dto';
import { UpdateAccesorioDto } from './dto/update-accesorio.dto';

@Controller('accesorio')
export class AccesorioController {
  constructor(private readonly accesorioService: AccesorioService) {}

  @Post()
  create(@Body() createAccesorioDto: CreateAccesorioDto) {
    return this.accesorioService.create(createAccesorioDto);
  }

  @Get()
  findAll() {
    return this.accesorioService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accesorioService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccesorioDto: UpdateAccesorioDto) {
    return this.accesorioService.update(+id, updateAccesorioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accesorioService.remove(+id);
  }
}
