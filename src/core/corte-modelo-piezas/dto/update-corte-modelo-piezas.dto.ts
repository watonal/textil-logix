import { PartialType } from '@nestjs/mapped-types';
import { CreateCorteModeloPiezasDto } from './create-corte-modelo-piezas.dto';

export class UpdateCorteModeloPiezasDto extends PartialType(CreateCorteModeloPiezasDto) {}
