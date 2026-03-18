import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleMaquilaDto } from './create-detalle-maquila.dto';

export class UpdateDetalleMaquilaDto extends PartialType(CreateDetalleMaquilaDto) {}
