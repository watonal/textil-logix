import { PartialType } from '@nestjs/mapped-types';
import { CreateMaquildorDto } from './create-maquildor.dto';

export class UpdateMaquildorDto extends PartialType(CreateMaquildorDto) {}
