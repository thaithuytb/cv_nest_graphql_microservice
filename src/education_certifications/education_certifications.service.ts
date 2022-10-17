import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EducationCertification } from '../entities';
import { Cv } from '../entities/cv.entity';
import { CreateEducationCertificationInput } from './dto/createEC_input.dto';
import { CvsService } from '../cvs/cvs.service';
import resolveError from '../errors/error';

@Injectable()
export class EducationCertificationsService {
  constructor(
    @InjectRepository(EducationCertification)
    private readonly educationCertificationRepository: EntityRepository<EducationCertification>,
    @Inject(forwardRef(() => CvsService))
    private readonly cvsService: CvsService,
  ) {}
  //==========Call from resolver
  async createEducationCertification(
    createECInput: CreateEducationCertificationInput,
    cv: Cv,
  ) {
    const { name, time, major } = createECInput;
    try {
      const newEC = new EducationCertification(name, time);
      newEC.major = major;
      newEC.cv = cv;

      const newECDb = await this.educationCertificationRepository.create(newEC);
      await this.educationCertificationRepository.persistAndFlush(newECDb);

      return newECDb;
    } catch (error) {
      resolveError(error);
    }
  }
  //==========Call from resolver
  async findCvByUserIdAndCvId(cv_id: number, user_id: number) {
    try {
      const cv = await this.cvsService.getCvById(cv_id);
      if (!cv) {
        throw new HttpException('Cv not found', HttpStatus.NOT_FOUND);
      }
      if (cv.user.id !== user_id) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      return cv;
    } catch (error) {
      resolveError(error);
    }
  }

  //parent
  async getEducationCertificationsByCvId(cv_id: number) {
    try {
      return await this.educationCertificationRepository.find({
        cv: {
          id: cv_id,
        },
      });
    } catch (error) {
      resolveError(error);
    }
  }
}
