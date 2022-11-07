import { Module } from '@nestjs/common';
import { CvModule } from './cv/cv.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { EducationCertificationModule } from './education_certification/education_certification.module';
import { WorkExperienceModule } from './work_experience/work_experience.module';
import { ExperienceProjectModule } from './experience_project/experience_project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      context: ({ req, res }) => {
        return { req, res };
      },
    }),
    CvModule,
    EducationCertificationModule,
    AuthModule,
    WorkExperienceModule,
    ExperienceProjectModule,
  ],
})
export class AppModule {}
