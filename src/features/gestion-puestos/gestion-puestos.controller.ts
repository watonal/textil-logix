import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PuestoTrabajoService } from '../../core/puesto-trabajo/puesto-trabajo.service';
import { CreatePuestoTrabajoDto } from '../../core/puesto-trabajo/dto/create-puesto-trabajo.dto';
import { UpdatePuestoTrabajoDto } from '../../core/puesto-trabajo/dto/update-puesto-trabajo.dto';

@Controller('gestion-puestos')
export class GestionPuestosController {
  constructor(private readonly puestoTrabajoService: PuestoTrabajoService) {}

  @Get()
  findAll() {
    return this.puestoTrabajoService.findAll(true); // 👈 reutiliza core
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puestoTrabajoService.findOne(Number(id), true);
  }

  @Post()
  create(@Body() dto: CreatePuestoTrabajoDto) {
    return this.puestoTrabajoService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePuestoTrabajoDto) {
    return this.puestoTrabajoService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puestoTrabajoService.remove(Number(id));
  }
}
