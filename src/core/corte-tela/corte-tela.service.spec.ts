import { Test, TestingModule } from '@nestjs/testing';
import { CorteTelaService } from './corte-tela.service';

describe('CorteTelaService', () => {
  let service: CorteTelaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorteTelaService],
    }).compile();

    service = module.get<CorteTelaService>(CorteTelaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
