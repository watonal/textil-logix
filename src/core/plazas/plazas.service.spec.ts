import { Test, TestingModule } from '@nestjs/testing';
import { PlazasService } from './plazas.service';

describe('PlazasService', () => {
  let service: PlazasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlazasService],
    }).compile();

    service = module.get<PlazasService>(PlazasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
