import { Test, TestingModule } from '@nestjs/testing';
import { PlazasController } from './plazas.controller';
import { PlazasService } from './plazas.service';

describe('PlazasController', () => {
  let controller: PlazasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlazasController],
      providers: [PlazasService],
    }).compile();

    controller = module.get<PlazasController>(PlazasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
