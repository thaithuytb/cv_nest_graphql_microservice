import {
  Args,
  Context,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login_input.dto';
import { InfoUserInput } from '../types/inputs/infoUserInput';
import { User } from '../entities';
import { LoginMutationResponse } from '../types/responses/mutation/loginMutationResponse';
import { Cv } from '../entities/cv.entity';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((_returns) => User)
  @UseGuards(new AuthGuard())
  async me(@Context() ctx: any) {
    return await this.authService.getUserByEmail(ctx.user.email);
  }

  @Mutation((_returns) => LoginMutationResponse)
  async register(
    @Args('registerInput')
    registerInput: RegisterDto,
  ) {
    return await this.authService.register(registerInput);
  }

  @Mutation((_returns) => LoginMutationResponse)
  async login(
    @Args({
      name: 'loginInput',
      type: () => LoginDto,
    })
    loginInput: LoginDto,
  ) {
    return await this.authService.login(loginInput);
  }

  @Mutation((_returns) => User)
  @UseGuards(new AuthGuard())
  async updateUsername(
    @Context() ctx: any,
    @Args('infoUserInput') infoUserInput: InfoUserInput,
  ) {
    return await this.authService.updateUser(ctx.user.email, infoUserInput);
  }

  @ResolveField('cvs', (_returns) => [Cv])
  async getCvs(@Parent() user: User) {
    const { id } = user;
    return await this.authService.findCvsByUserId(id);
  }
}
