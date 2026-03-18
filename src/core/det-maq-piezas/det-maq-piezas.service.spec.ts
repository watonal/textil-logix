import { Test, TestingModule } from '@nestjs/testing';
import { DetMaqPiezasService } from './det-maq-piezas.service';

describe('DetMaqPiezasService', () => {
  let service: DetMaqPiezasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetMaqPiezasService],
    }).compile();

    service = module.get<DetMaqPiezasService>(DetMaqPiezasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
