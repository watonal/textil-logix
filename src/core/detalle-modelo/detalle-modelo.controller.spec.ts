import { Test, TestingModule } from '@nestjs/testing';
import { DetalleModeloController } from './detalle-modelo.controller';
import { DetalleModeloService } from './detalle-modelo.service';

describe('DetalleModeloController', () => {
  let controller: DetalleModeloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleModeloController],
      providers: [DetalleModeloService],
    }).compile();

    controller = module.get<DetalleModeloController>(DetalleModeloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
