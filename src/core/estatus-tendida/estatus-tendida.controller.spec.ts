import { Test, TestingModule } from '@nestjs/testing';
import { EstatusTendidaController } from './estatus-tendida.controller';
import { EstatusTendidaService } from './estatus-tendida.service';

describe('EstatusTendidaController', () => {
  let controller: EstatusTendidaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstatusTendidaController],
      providers: [EstatusTendidaService],
    }).compile();

    controller = module.get<EstatusTendidaController>(EstatusTendidaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
