import { PartialType } from '@nestjs/mapped-types';
import { CreateEstatusTendidaDto } from './create-estatus-tendida.dto';

export class UpdateEstatusTendidaDto extends PartialType(CreateEstatusTendidaDto) {}
