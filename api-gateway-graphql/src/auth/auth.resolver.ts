import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { User } from 'src/types/user.type';
import { AuthService } from './auth.service';
import { InputLoginRequest } from './dtos/inputLoginRequest.dto';
import { InputRegisterRequest } from './dtos/inputRegisterRequest.dto';
import { ResponseAuthFromGrpc } from './interfaces/authServiceGrpc';
import { RpcException } from '@nestjs/microservices';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((_returns) => ResponseAuthFromGrpc)
  async login(@Args('inputLogin') inputLogin: InputLoginRequest) {
    try {
      return await this.authService.login(inputLogin);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Mutation((_returns) => ResponseAuthFromGrpc)
  async register(@Args('inputRegister') inputRegister: InputRegisterRequest) {
    try {
      return await this.authService.register(inputRegister);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(new AuthGuard())
  @Query((_returns) => Boolean)
  async isAdmin(@Context() ctx: any): Promise<boolean> {
    const { id, email } = ctx.user;
    try {
      const checkPermission = await this.authService.isAdmin({ id, email });
      if (checkPermission) {
        return checkPermission.isAdmin;
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
