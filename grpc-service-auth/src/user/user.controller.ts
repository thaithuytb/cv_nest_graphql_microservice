import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InputLoginRequest } from './interfaces/inputLoginRequest';
import { UserService } from './user.service';
import { InputRegisterRequest } from './interfaces/inputRegisterRequest';
import { InputPermissionRequest } from './interfaces/inputPermissionRequest';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('AuthServiceGrpc', 'login')
  async login(data: InputLoginRequest) {
    return await this.userService.login(data);
  }

  @GrpcMethod('AuthServiceGrpc', 'register')
  async register(data: InputRegisterRequest) {
    return await this.userService.register(data);
  }

  @GrpcMethod('AuthServiceGrpc', 'isAdmin')
  async isAdmin(data: InputPermissionRequest) {
    return await this.userService.isAdmin(data);
  }
}
