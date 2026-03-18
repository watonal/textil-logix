import { PartialType } from '@nestjs/mapped-types';
import { CreateMaquilaDto } from './create-maquila.dto';

export class UpdateMaquilaDto extends PartialType(CreateMaquilaDto) {}
