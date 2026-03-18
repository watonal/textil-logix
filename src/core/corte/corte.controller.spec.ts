import { Test, TestingModule } from '@nestjs/testing';
import { CorteController } from './corte.controller';
import { CorteService } from './corte.service';

describe('CorteController', () => {
  let controller: CorteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorteController],
      providers: [CorteService],
    }).compile();

    controller = module.get<CorteController>(CorteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
