import { Module, forwardRef } from '@nestjs/common';
import { WorkExperiencesResolver } from './work_experiences.resolver';
import { WorkExperiencesService } from './work_experiences.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { WorkExperience } from 'src/entities';
import { CvsModule } from '../cvs/cvs.module';
import { ExperienceProjectsModule } from '../experience_projects/experience_projects.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([WorkExperience]),
    forwardRef(() => CvsModule),
    forwardRef(() => ExperienceProjectsModule),
  ],
  providers: [WorkExperiencesResolver, WorkExperiencesService],
  exports: [WorkExperiencesService],
})
export class WorkExperiencesModule {}
