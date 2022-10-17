import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { CvsModule } from './cvs/cvs.module';
import { AuthModule } from './auth/auth.module';
import { EducationCertificationsModule } from './education_certifications/education_certifications.module';
import { WorkExperiencesModule } from './work_experiences/work_experiences.module';
import { ExperienceProjectsModule } from './experience_projects/experience_projects.module';

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
    MikroOrmModule.forRoot(),
    CvsModule,
    AuthModule,
    EducationCertificationsModule,
    WorkExperiencesModule,
    ExperienceProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
