import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoInsumoDto } from './create-tipo-insumo.dto';

export class UpdateTipoInsumoDto extends PartialType(CreateTipoInsumoDto) {}
