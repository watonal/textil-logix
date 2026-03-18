import { Test, TestingModule } from '@nestjs/testing';
import { CorteModeloPiezasService } from './corte-modelo-piezas.service';

describe('CorteModeloPiezasService', () => {
  let service: CorteModeloPiezasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorteModeloPiezasService],
    }).compile();

    service = module.get<CorteModeloPiezasService>(CorteModeloPiezasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
