import { PartialType } from '@nestjs/mapped-types';
import { CreateEntregaMaquilaDto } from './create-entrega-maquila.dto';

export class UpdateEntregaMaquilaDto extends PartialType(CreateEntregaMaquilaDto) {}
