import { Test, TestingModule } from '@nestjs/testing';
import { UpholdService } from './uphold.service';

describe('UpholdService', () => {
  let service: UpholdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpholdService],
    }).compile();

    service = module.get<UpholdService>(UpholdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
