import { Test, TestingModule } from '@nestjs/testing';
import { EntregaMaquilaController } from './entrega-maquila.controller';
import { EntregaMaquilaService } from './entrega-maquila.service';

describe('EntregaMaquilaController', () => {
  let controller: EntregaMaquilaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntregaMaquilaController],
      providers: [EntregaMaquilaService],
    }).compile();

    controller = module.get<EntregaMaquilaController>(EntregaMaquilaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
