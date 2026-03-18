import { Test, TestingModule } from '@nestjs/testing';
import { EstatusCorteController } from './estatus-corte.controller';
import { EstatusCorteService } from './estatus-corte.service';

describe('EstatusCorteController', () => {
  let controller: EstatusCorteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstatusCorteController],
      providers: [EstatusCorteService],
    }).compile();

    controller = module.get<EstatusCorteController>(EstatusCorteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
