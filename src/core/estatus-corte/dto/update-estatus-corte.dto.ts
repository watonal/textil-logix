import { PartialType } from '@nestjs/mapped-types';
import { CreateEstatusCorteDto } from './create-estatus-corte.dto';

export class UpdateEstatusCorteDto extends PartialType(CreateEstatusCorteDto) {}
