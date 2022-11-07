import { Observable } from 'rxjs';
import { InputCvIdRequest } from 'src/cv/dtos/inputCvIdRequest.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { WorkExperience } from '../../types/work_experience.type';

ObjectType();
export class ResponseWEFromGrpc {
  @Field((_type) => [WorkExperience])
  data: [WorkExperience];
}

export interface WEServiceGrpc {
  findWorkExperiencesByCvId(
    data: InputCvIdRequest,
  ): Observable<ResponseWEFromGrpc>;
}
