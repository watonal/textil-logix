import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleModeloDto } from './create-detalle-modelo.dto';

export class UpdateDetalleModeloDto extends PartialType(CreateDetalleModeloDto) {}
