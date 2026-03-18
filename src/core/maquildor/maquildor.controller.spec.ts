import { Test, TestingModule } from '@nestjs/testing';
import { MaquildorController } from './maquildor.controller';
import { MaquildorService } from './maquildor.service';

describe('MaquildorController', () => {
  let controller: MaquildorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaquildorController],
      providers: [MaquildorService],
    }).compile();

    controller = module.get<MaquildorController>(MaquildorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
