import { Test, TestingModule } from '@nestjs/testing';
import { EntregaMaquilaService } from './entrega-maquila.service';

describe('EntregaMaquilaService', () => {
  let service: EntregaMaquilaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntregaMaquilaService],
    }).compile();

    service = module.get<EntregaMaquilaService>(EntregaMaquilaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
