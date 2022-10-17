import { Test, TestingModule } from '@nestjs/testing';
import { WorkExperiencesResolver } from './work_experiences.resolver';

describe('WorkExperiencesResolver', () => {
  let resolver: WorkExperiencesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkExperiencesResolver],
    }).compile();

    resolver = module.get<WorkExperiencesResolver>(WorkExperiencesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
