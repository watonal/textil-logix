import { PartialType } from '@nestjs/mapped-types';
import { CreateDetMaqCorteDto } from './create-det-maq-corte.dto';

export class UpdateDetMaqCorteDto extends PartialType(CreateDetMaqCorteDto) {}
