import { InputCvIdRequest } from '../dtos/inputCvIdRequest.dto';
import { Observable } from 'rxjs';
import { Cv } from '../../types/cv.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { InputCreateCvRequest } from '../dtos/inputCreateCvRequest.dto';

@ObjectType()
export class ResponseCvFromGrpc {
  @Field((_type) => Cv)
  cv: Cv;
}

export interface CvServiceGrpc {
  getCv(data: InputCvIdRequest): Observable<ResponseCvFromGrpc>;
  createCv(data: InputCreateCvRequest): Observable<ResponseCvFromGrpc>;
}
