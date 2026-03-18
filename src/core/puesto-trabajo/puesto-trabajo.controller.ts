import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuestoTrabajoService } from './puesto-trabajo.service';
import { CreatePuestoTrabajoDto } from './dto/create-puesto-trabajo.dto';
import { UpdatePuestoTrabajoDto } from './dto/update-puesto-trabajo.dto';

@Controller('puesto-trabajo')
export class PuestoTrabajoController {
  constructor(private readonly puestotrabajoService: PuestoTrabajoService) {}

  @Post()
  create(@Body() createPuestoTrabajoDto: CreatePuestoTrabajoDto) {
    return this.puestotrabajoService.create(createPuestoTrabajoDto);
  }

  @Get()
  findAll() {
    return this.puestotrabajoService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puestotrabajoService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuestoTrabajoDto: UpdatePuestoTrabajoDto) {
    return this.puestotrabajoService.update(+id, updatePuestoTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puestotrabajoService.remove(+id);
  }
}
