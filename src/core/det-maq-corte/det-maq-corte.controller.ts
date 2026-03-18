import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetMaqCorteService } from './det-maq-corte.service';
import { CreateDetMaqCorteDto } from './dto/create-det-maq-corte.dto';
import { UpdateDetMaqCorteDto } from './dto/update-det-maq-corte.dto';

@Controller('det-maq-corte')
export class DetMaqCorteController {
  constructor(private readonly detmaqcorteService: DetMaqCorteService) {}

  @Post()
  create(@Body() createDetMaqCorteDto: CreateDetMaqCorteDto) {
    return this.detmaqcorteService.create(createDetMaqCorteDto);
  }

  @Get()
  findAll() {
    return this.detmaqcorteService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detmaqcorteService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetMaqCorteDto: UpdateDetMaqCorteDto) {
    return this.detmaqcorteService.update(+id, updateDetMaqCorteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detmaqcorteService.remove(+id);
  }
}
