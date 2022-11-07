import { Observable } from 'rxjs';
import { InputCvIdRequest } from 'src/cv/dtos/inputCvIdRequest.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { EducationCertification } from '../../types/education_certification.type';

ObjectType();
export class ResponseECFromGrpc {
  @Field((_type) => [EducationCertification])
  data: [EducationCertification];
}

export interface ECServiceGrpc {
  findEducationCertificationsByCvId(
    data: InputCvIdRequest,
  ): Observable<ResponseECFromGrpc>;
}
