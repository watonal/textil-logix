import { Test, TestingModule } from '@nestjs/testing';
import { CorteModeloController } from './corte-modelo.controller';
import { CorteModeloService } from './corte-modelo.service';

describe('CorteModeloController', () => {
  let controller: CorteModeloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorteModeloController],
      providers: [CorteModeloService],
    }).compile();

    controller = module.get<CorteModeloController>(CorteModeloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
