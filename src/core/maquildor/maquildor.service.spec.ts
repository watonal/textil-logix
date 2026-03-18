import { Test, TestingModule } from '@nestjs/testing';
import { MaquildorService } from './maquildor.service';

describe('MaquildorService', () => {
  let service: MaquildorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaquildorService],
    }).compile();

    service = module.get<MaquildorService>(MaquildorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
