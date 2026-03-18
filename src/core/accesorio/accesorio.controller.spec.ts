import { Test, TestingModule } from '@nestjs/testing';
import { AccesorioController } from './accesorio.controller';
import { AccesorioService } from './accesorio.service';

describe('AccesorioController', () => {
  let controller: AccesorioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccesorioController],
      providers: [AccesorioService],
    }).compile();

    controller = module.get<AccesorioController>(AccesorioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
