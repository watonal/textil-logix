import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetMaqPiezasService } from './det-maq-piezas.service';
import { CreateDetMaqPiezasDto } from './dto/create-det-maq-piezas.dto';
import { UpdateDetMaqPiezasDto } from './dto/update-det-maq-piezas.dto';

@Controller('det-maq-piezas')
export class DetMaqPiezasController {
  constructor(private readonly detmaqpiezasService: DetMaqPiezasService) {}

  @Post()
  create(@Body() createDetMaqPiezasDto: CreateDetMaqPiezasDto) {
    return this.detmaqpiezasService.create(createDetMaqPiezasDto);
  }

  @Get()
  findAll() {
    return this.detmaqpiezasService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detmaqpiezasService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetMaqPiezasDto: UpdateDetMaqPiezasDto) {
    return this.detmaqpiezasService.update(+id, updateDetMaqPiezasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detmaqpiezasService.remove(+id);
  }
}
