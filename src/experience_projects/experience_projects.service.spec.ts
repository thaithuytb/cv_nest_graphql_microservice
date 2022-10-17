import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceProjectsService } from './experience_projects.service';

describe('ExperienceProjectsService', () => {
  let service: ExperienceProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperienceProjectsService],
    }).compile();

    service = module.get<ExperienceProjectsService>(ExperienceProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
