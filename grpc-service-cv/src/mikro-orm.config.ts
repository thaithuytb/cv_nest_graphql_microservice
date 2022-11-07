import { Logger } from '@nestjs/common';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { Cv } from './entities/cv.entity';
import { EducationCertification } from './entities/education_certification.entity';
import { ExperienceProject } from './entities/experience_project.entity';
import { WorkExperience } from './entities/work_experience.entity';

const configMikroOrm: MikroOrmModuleSyncOptions = {
  type: 'postgresql',
  host: process.env.DATABASE_HOST,
  dbName: process.env.DATABASE_DBNAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_HOST),
  tsNode: true,
  discovery: {
    disableDynamicFileAccess: true,
  },
  entities: [Cv, EducationCertification, ExperienceProject, WorkExperience],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    disableForeignKeys: false,
  },
  allowGlobalContext: true,
  logger: (msg) => Logger.log(msg),
};

export default configMikroOrm;
