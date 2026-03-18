import { Test, TestingModule } from '@nestjs/testing';
import { CorteModeloPiezasController } from './corte-modelo-piezas.controller';
import { CorteModeloPiezasService } from './corte-modelo-piezas.service';

describe('CorteModeloPiezasController', () => {
  let controller: CorteModeloPiezasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorteModeloPiezasController],
      providers: [CorteModeloPiezasService],
    }).compile();

    controller = module.get<CorteModeloPiezasController>(CorteModeloPiezasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
