import { Test, TestingModule } from '@nestjs/testing';
import { DetalleModeloService } from './detalle-modelo.service';

describe('DetalleModeloService', () => {
  let service: DetalleModeloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleModeloService],
    }).compile();

    service = module.get<DetalleModeloService>(DetalleModeloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
