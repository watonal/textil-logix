import { Test, TestingModule } from '@nestjs/testing';
import { PuestoTrabajoController } from './puesto-trabajo.controller';
import { PuestoTrabajoService } from './puesto-trabajo.service';

describe('PuestoTrabajoController', () => {
  let controller: PuestoTrabajoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuestoTrabajoController],
      providers: [PuestoTrabajoService],
    }).compile();

    controller = module.get<PuestoTrabajoController>(PuestoTrabajoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
