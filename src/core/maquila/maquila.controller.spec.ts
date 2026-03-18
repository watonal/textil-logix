import { Test, TestingModule } from '@nestjs/testing';
import { MaquilaController } from './maquila.controller';
import { MaquilaService } from './maquila.service';

describe('MaquilaController', () => {
  let controller: MaquilaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaquilaController],
      providers: [MaquilaService],
    }).compile();

    controller = module.get<MaquilaController>(MaquilaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
