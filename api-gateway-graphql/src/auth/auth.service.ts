import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AuthServiceGrpc,
  ResponseAuthFromGrpc,
  ResponsePermission,
} from './interfaces/authServiceGrpc';
import { lastValueFrom } from 'rxjs';
import { InputLoginRequest } from './dtos/inputLoginRequest.dto';
import { InputRegisterRequest } from './dtos/inputRegisterRequest.dto';
import { InputPermissionRequest } from './dtos/inputPermissionRequest.dto';

@Injectable()
export class AuthService {
  private authService: AuthServiceGrpc;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceGrpc>('AuthServiceGrpc');
  }

  async login(loginInput: InputLoginRequest): Promise<ResponseAuthFromGrpc> {
    return await lastValueFrom(await this.authService.login(loginInput));
  }

  async register(
    registerInput: InputRegisterRequest,
  ): Promise<ResponseAuthFromGrpc> {
    return await lastValueFrom(await this.authService.register(registerInput));
  }

  async isAdmin(
    dataInput: InputPermissionRequest,
  ): Promise<ResponsePermission> {
    return await lastValueFrom(await this.authService.isAdmin(dataInput));
  }
}
