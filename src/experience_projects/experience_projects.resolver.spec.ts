import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceProjectsResolver } from './experience_projects.resolver';

describe('ExperienceProjectsResolver', () => {
  let resolver: ExperienceProjectsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperienceProjectsResolver],
    }).compile();

    resolver = module.get<ExperienceProjectsResolver>(ExperienceProjectsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
