import { Test, TestingModule } from '@nestjs/testing';
import { EstatusTendidaService } from './estatus-tendida.service';

describe('EstatusTendidaService', () => {
  let service: EstatusTendidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstatusTendidaService],
    }).compile();

    service = module.get<EstatusTendidaService>(EstatusTendidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
