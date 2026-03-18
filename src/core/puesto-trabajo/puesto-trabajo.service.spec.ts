import { Test, TestingModule } from '@nestjs/testing';
import { PuestoTrabajoService } from './puesto-trabajo.service';

describe('PuestoTrabajoService', () => {
  let service: PuestoTrabajoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuestoTrabajoService],
    }).compile();

    service = module.get<PuestoTrabajoService>(PuestoTrabajoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
