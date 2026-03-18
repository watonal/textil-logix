import { PartialType } from '@nestjs/mapped-types';
import { CreateDetMaqPiezasDto } from './create-det-maq-piezas.dto';

export class UpdateDetMaqPiezasDto extends PartialType(CreateDetMaqPiezasDto) {}
