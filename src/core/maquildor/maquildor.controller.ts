import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaquildorService } from './maquildor.service';
import { CreateMaquildorDto } from './dto/create-maquildor.dto';
import { UpdateMaquildorDto } from './dto/update-maquildor.dto';

@Controller('maquildor')
export class MaquildorController {
  constructor(private readonly maquildorService: MaquildorService) {}

  @Post()
  create(@Body() createMaquildorDto: CreateMaquildorDto) {
    return this.maquildorService.create(createMaquildorDto);
  }

  @Get()
  findAll() {
    return this.maquildorService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maquildorService.findOne(+id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaquildorDto: UpdateMaquildorDto) {
    return this.maquildorService.update(+id, updateMaquildorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maquildorService.remove(+id);
  }
}
