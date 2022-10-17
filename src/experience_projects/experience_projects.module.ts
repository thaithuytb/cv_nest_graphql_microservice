import { Module, forwardRef } from '@nestjs/common';
import { ExperienceProjectsResolver } from './experience_projects.resolver';
import { ExperienceProjectsService } from './experience_projects.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ExperienceProject } from '../entities';
import { WorkExperiencesModule } from '../work_experiences/work_experiences.module';
import { CvsModule } from '../cvs/cvs.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([ExperienceProject]),
    forwardRef(() => CvsModule),
    forwardRef(() => WorkExperiencesModule),
    forwardRef(() => WorkExperiencesModule),
  ],
  providers: [ExperienceProjectsResolver, ExperienceProjectsService],
  exports: [ExperienceProjectsService],
})
export class ExperienceProjectsModule {}
