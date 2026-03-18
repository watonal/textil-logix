import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColoniaService } from './colonia.service';
import { CreateColoniaDto } from './dto/create-colonia.dto';
import { UpdateColoniaDto } from './dto/update-colonia.dto';

@Controller('colonia')
export class ColoniaController {
  constructor(private readonly coloniaService: ColoniaService) {}

  @Post()
  create(@Body() createColoniaDto: CreateColoniaDto) {
    return this.coloniaService.create(createColoniaDto);
  }

  @Get()
  findAll() {
    return this.coloniaService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coloniaService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColoniaDto: UpdateColoniaDto) {
    return this.coloniaService.update(+id, updateColoniaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coloniaService.remove(+id);
  }
}
