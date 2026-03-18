import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlazasService } from './plazas.service';
import { CreatePlazasDto } from './dto/create-plazas.dto';
import { UpdatePlazasDto } from './dto/update-plazas.dto';

@Controller('plazas')
export class PlazasController {
  constructor(private readonly plazasService: PlazasService) {}

  @Post()
  create(@Body() createPlazasDto: CreatePlazasDto) {
    return this.plazasService.create(createPlazasDto);
  }

  @Get()
  findAll() {
    return this.plazasService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plazasService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlazasDto: UpdatePlazasDto) {
    return this.plazasService.update(+id, updatePlazasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plazasService.remove(+id);
  }
}
