import { Test, TestingModule } from '@nestjs/testing';
import { EstatusCorteService } from './estatus-corte.service';

describe('EstatusCorteService', () => {
  let service: EstatusCorteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstatusCorteService],
    }).compile();

    service = module.get<EstatusCorteService>(EstatusCorteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
