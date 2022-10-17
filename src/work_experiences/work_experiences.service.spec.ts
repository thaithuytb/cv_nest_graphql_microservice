import { Test, TestingModule } from '@nestjs/testing';
import { WorkExperiencesService } from './work_experiences.service';

describe('WorkExperiencesService', () => {
  let service: WorkExperiencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkExperiencesService],
    }).compile();

    service = module.get<WorkExperiencesService>(WorkExperiencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
