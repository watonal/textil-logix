import { Test, TestingModule } from '@nestjs/testing';
import { DetMaqCorteService } from './det-maq-corte.service';

describe('DetMaqCorteService', () => {
  let service: DetMaqCorteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetMaqCorteService],
    }).compile();

    service = module.get<DetMaqCorteService>(DetMaqCorteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
