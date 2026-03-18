import { Test, TestingModule } from '@nestjs/testing';
import { CorteService } from './corte.service';

describe('CorteService', () => {
  let service: CorteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorteService],
    }).compile();

    service = module.get<CorteService>(CorteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
