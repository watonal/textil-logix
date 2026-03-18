import { PartialType } from '@nestjs/mapped-types';
import { CreateCorteModeloDto } from './create-corte-modelo.dto';

export class UpdateCorteModeloDto extends PartialType(CreateCorteModeloDto) {}
