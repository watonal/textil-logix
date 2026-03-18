import { PartialType } from '@nestjs/mapped-types';
import { CreateCorteTelaDto } from './create-corte-tela.dto';

export class UpdateCorteTelaDto extends PartialType(CreateCorteTelaDto) {}
