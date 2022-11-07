import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from 'src/types/user.type';
import { InputLoginRequest } from '../dtos/inputLoginRequest.dto';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';
import { InputPermissionRequest } from '../dtos/inputPermissionRequest.dto';

@ObjectType()
export class ResponseAuthFromGrpc {
  @Field((_type) => User)
  user: User;

  @Field((_type) => String)
  accessToken: string;
}

ObjectType();
export class ResponsePermission {
  @Field((_type) => Boolean)
  isAdmin: boolean;
}

export interface AuthServiceGrpc {
  login(data: InputLoginRequest): Observable<ResponseAuthFromGrpc>;
  register(data: InputRegisterRequest): Observable<ResponseAuthFromGrpc>;
  isAdmin(data: InputPermissionRequest): Observable<ResponsePermission>;
}
