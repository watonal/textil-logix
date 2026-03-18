import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstatusTendidaService } from './estatus-tendida.service';
import { CreateEstatusTendidaDto } from './dto/create-estatus-tendida.dto';
import { UpdateEstatusTendidaDto } from './dto/update-estatus-tendida.dto';

@Controller('estatus-tendida')
export class EstatusTendidaController {
  constructor(private readonly estatustendidaService: EstatusTendidaService) {}

  @Post()
  create(@Body() createEstatusTendidaDto: CreateEstatusTendidaDto) {
    return this.estatustendidaService.create(createEstatusTendidaDto);
  }

  @Get()
  findAll() {
    return this.estatustendidaService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estatustendidaService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstatusTendidaDto: UpdateEstatusTendidaDto) {
    return this.estatustendidaService.update(+id, updateEstatusTendidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estatustendidaService.remove(+id);
  }
}
