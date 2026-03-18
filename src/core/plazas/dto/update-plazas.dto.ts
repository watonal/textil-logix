import { PartialType } from '@nestjs/mapped-types';
import { CreatePlazasDto } from './create-plazas.dto';

export class UpdatePlazasDto extends PartialType(CreatePlazasDto) {}
