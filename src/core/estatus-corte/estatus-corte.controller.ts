import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstatusCorteService } from './estatus-corte.service';
import { CreateEstatusCorteDto } from './dto/create-estatus-corte.dto';
import { UpdateEstatusCorteDto } from './dto/update-estatus-corte.dto';

@Controller('estatus-corte')
export class EstatusCorteController {
  constructor(private readonly estatuscorteService: EstatusCorteService) {}

  @Post()
  create(@Body() createEstatusCorteDto: CreateEstatusCorteDto) {
    return this.estatuscorteService.create(createEstatusCorteDto);
  }

  @Get()
  findAll() {
    return this.estatuscorteService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estatuscorteService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstatusCorteDto: UpdateEstatusCorteDto) {
    return this.estatuscorteService.update(+id, updateEstatusCorteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estatuscorteService.remove(+id);
  }
}
