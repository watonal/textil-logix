import { Test, TestingModule } from '@nestjs/testing';
import { MaquilaService } from './maquila.service';

describe('MaquilaService', () => {
  let service: MaquilaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaquilaService],
    }).compile();

    service = module.get<MaquilaService>(MaquilaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
