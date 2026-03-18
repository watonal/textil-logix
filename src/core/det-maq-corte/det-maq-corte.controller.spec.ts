import { Test, TestingModule } from '@nestjs/testing';
import { DetMaqCorteController } from './det-maq-corte.controller';
import { DetMaqCorteService } from './det-maq-corte.service';

describe('DetMaqCorteController', () => {
  let controller: DetMaqCorteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetMaqCorteController],
      providers: [DetMaqCorteService],
    }).compile();

    controller = module.get<DetMaqCorteController>(DetMaqCorteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
