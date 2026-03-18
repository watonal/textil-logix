import { Test, TestingModule } from '@nestjs/testing';
import { TipoInsumoController } from './tipo-insumo.controller';
import { TipoInsumoService } from './tipo-insumo.service';

describe('TipoInsumoController', () => {
  let controller: TipoInsumoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoInsumoController],
      providers: [TipoInsumoService],
    }).compile();

    controller = module.get<TipoInsumoController>(TipoInsumoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
