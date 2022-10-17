import { Test, TestingModule } from '@nestjs/testing';
import { EducationCertificationsService } from './education_certifications.service';

describe('EducationCertificationsService', () => {
  let service: EducationCertificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationCertificationsService],
    }).compile();

    service = module.get<EducationCertificationsService>(EducationCertificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
