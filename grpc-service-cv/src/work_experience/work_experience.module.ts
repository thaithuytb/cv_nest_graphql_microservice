import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { WorkExperienceService } from './work_experience.service';
import { WorkExperience } from '../entities/work_experience.entity';
import { WorkExperienceController } from './work_experience.controller';

@Module({
  imports: [MikroOrmModule.forFeature([WorkExperience])],
  providers: [WorkExperienceService],
  controllers: [WorkExperienceController],
})
export class WorkExperienceModule {}
