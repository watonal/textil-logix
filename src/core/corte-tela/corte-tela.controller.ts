import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorteTelaService } from './corte-tela.service';
import { CreateCorteTelaDto } from './dto/create-corte-tela.dto';
import { UpdateCorteTelaDto } from './dto/update-corte-tela.dto';

@Controller('corte-tela')
export class CorteTelaController {
  constructor(private readonly cortetelaService: CorteTelaService) {}

  @Post()
  create(@Body() createCorteTelaDto: CreateCorteTelaDto) {
    return this.cortetelaService.create(createCorteTelaDto);
  }

  @Get()
  findAll() {
    return this.cortetelaService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cortetelaService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorteTelaDto: UpdateCorteTelaDto) {
    return this.cortetelaService.update(+id, updateCorteTelaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cortetelaService.remove(+id);
  }
}
