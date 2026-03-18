import { Test, TestingModule } from '@nestjs/testing';
import { CorteModeloService } from './corte-modelo.service';

describe('CorteModeloService', () => {
  let service: CorteModeloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorteModeloService],
    }).compile();

    service = module.get<CorteModeloService>(CorteModeloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
