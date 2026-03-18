import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorteService } from './corte.service';
import { CreateCorteDto } from './dto/create-corte.dto';
import { UpdateCorteDto } from './dto/update-corte.dto';

@Controller('corte')
export class CorteController {
  constructor(private readonly corteService: CorteService) {}

  @Post()
  create(@Body() createCorteDto: CreateCorteDto) {
    return this.corteService.create(createCorteDto);
  }

  @Get()
  findAll() {
    return this.corteService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corteService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorteDto: UpdateCorteDto) {
    return this.corteService.update(+id, updateCorteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corteService.remove(+id);
  }
}
