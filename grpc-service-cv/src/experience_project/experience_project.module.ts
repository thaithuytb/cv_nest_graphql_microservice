import { Module } from '@nestjs/common';
import { ExperienceProjectService } from './experience_project.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ExperienceProject } from '../entities/experience_project.entity';
import { ExperienceProjectController } from './experience_project.controller';

@Module({
  imports: [MikroOrmModule.forFeature([ExperienceProject])],
  providers: [ExperienceProjectService],
  controllers: [ExperienceProjectController],
})
export class ExperienceProjectModule {}
