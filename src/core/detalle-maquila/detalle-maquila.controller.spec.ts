import { Test, TestingModule } from '@nestjs/testing';
import { DetalleMaquilaController } from './detalle-maquila.controller';
import { DetalleMaquilaService } from './detalle-maquila.service';

describe('DetalleMaquilaController', () => {
  let controller: DetalleMaquilaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleMaquilaController],
      providers: [DetalleMaquilaService],
    }).compile();

    controller = module.get<DetalleMaquilaController>(DetalleMaquilaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
