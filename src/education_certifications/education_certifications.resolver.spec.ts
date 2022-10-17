import { Test, TestingModule } from '@nestjs/testing';
import { EducationCertificationsResolver } from './education_certifications.resolver';

describe('EducationCertificationsResolver', () => {
  let resolver: EducationCertificationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationCertificationsResolver],
    }).compile();

    resolver = module.get<EducationCertificationsResolver>(EducationCertificationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
