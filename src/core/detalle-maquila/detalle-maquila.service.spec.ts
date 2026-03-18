import { Test, TestingModule } from '@nestjs/testing';
import { DetalleMaquilaService } from './detalle-maquila.service';

describe('DetalleMaquilaService', () => {
  let service: DetalleMaquilaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleMaquilaService],
    }).compile();

    service = module.get<DetalleMaquilaService>(DetalleMaquilaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
