import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleMaquilaService } from './detalle-maquila.service';
import { CreateDetalleMaquilaDto } from './dto/create-detalle-maquila.dto';
import { UpdateDetalleMaquilaDto } from './dto/update-detalle-maquila.dto';

@Controller('detalle-maquila')
export class DetalleMaquilaController {
  constructor(private readonly detallemaquilaService: DetalleMaquilaService) {}

  @Post()
  create(@Body() createDetalleMaquilaDto: CreateDetalleMaquilaDto) {
    return this.detallemaquilaService.create(createDetalleMaquilaDto);
  }

  @Get()
  findAll() {
    return this.detallemaquilaService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallemaquilaService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleMaquilaDto: UpdateDetalleMaquilaDto) {
    return this.detallemaquilaService.update(+id, updateDetalleMaquilaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallemaquilaService.remove(+id);
  }
}
