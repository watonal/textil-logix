import { Test, TestingModule } from '@nestjs/testing';
import { TipoInsumoService } from './tipo-insumo.service';

describe('TipoInsumoService', () => {
  let service: TipoInsumoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoInsumoService],
    }).compile();

    service = module.get<TipoInsumoService>(TipoInsumoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
