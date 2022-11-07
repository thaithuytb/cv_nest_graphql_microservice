import { Observable } from 'rxjs';
import { InputCvIdRequest } from 'src/cv/dtos/inputCvIdRequest.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { ExperienceProject } from '../../types/experience_project.type';
import { InputWEIdRequest } from 'src/work_experience/dtos/inputWEIdRequest.dto';

ObjectType();
export class ResponseEPFromGrpc {
  @Field((_type) => [ExperienceProject])
  data: [ExperienceProject];
}

export interface EPServiceGrpc {
  findExperienceProjectsByCvId(
    data: InputCvIdRequest,
  ): Observable<ResponseEPFromGrpc>;

  findExperienceProjectsByWEId(
    data: InputWEIdRequest,
  ): Observable<ResponseEPFromGrpc>;
}
