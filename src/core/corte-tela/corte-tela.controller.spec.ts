import { Test, TestingModule } from '@nestjs/testing';
import { CorteTelaController } from './corte-tela.controller';
import { CorteTelaService } from './corte-tela.service';

describe('CorteTelaController', () => {
  let controller: CorteTelaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorteTelaController],
      providers: [CorteTelaService],
    }).compile();

    controller = module.get<CorteTelaController>(CorteTelaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
