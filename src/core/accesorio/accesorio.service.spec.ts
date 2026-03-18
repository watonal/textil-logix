import { Test, TestingModule } from '@nestjs/testing';
import { AccesorioService } from './accesorio.service';

describe('AccesorioService', () => {
  let service: AccesorioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccesorioService],
    }).compile();

    service = module.get<AccesorioService>(AccesorioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
