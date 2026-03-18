import { Test, TestingModule } from '@nestjs/testing';
import { DetMaqPiezasController } from './det-maq-piezas.controller';
import { DetMaqPiezasService } from './det-maq-piezas.service';

describe('DetMaqPiezasController', () => {
  let controller: DetMaqPiezasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetMaqPiezasController],
      providers: [DetMaqPiezasService],
    }).compile();

    controller = module.get<DetMaqPiezasController>(DetMaqPiezasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
