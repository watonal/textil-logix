import { PartialType } from '@nestjs/mapped-types';
import { CreateCalleDto } from './create-calle.dto';

export class UpdateCalleDto extends PartialType(CreateCalleDto) {}
