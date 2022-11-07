import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User, UserRole } from './entities/user.entity';
import { InputLoginRequest } from './interfaces/inputLoginRequest';
import { verify, hash } from 'argon2';
import { sign } from 'jsonwebtoken';
import { InputRegisterRequest } from './interfaces/inputRegisterRequest';
import resolveError from '../error/error';
import { RpcException } from '@nestjs/microservices';
import { InputPermissionRequest } from './interfaces/inputPermissionRequest';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
  ) {}

  async register(registerInput: InputRegisterRequest) {
    const { email, password } = registerInput;

    try {
      const findUser = await this.userRepository.findOne({
        email,
      });

      if (findUser) {
        throw new RpcException({ message: 'Email is existed', code: 400 });
      }

      const hashedPassword = await hash(password);

      const newUser = new User();
      newUser.email = email;
      newUser.password = hashedPassword;

      const userDb = await this.userRepository.create(newUser);

      await this.userRepository.persistAndFlush(userDb);

      const accessToken = await this.signToken({
        id: userDb.id,
        email: userDb.email,
      } as User);

      return {
        user: userDb,
        accessToken,
      };
    } catch (error) {
      resolveError(error);
    }
  }

  async login(loginInput: InputLoginRequest) {
    const { email, password } = loginInput;
    try {
      const findUser = await this.userRepository.findOne({
        email,
      });

      if (!findUser) {
        throw new RpcException({
          message: 'Email or password is incorrect',
          code: 400,
        });
      }

      const correctPassword = await verify(findUser.password, password);
      if (!correctPassword) {
        throw new RpcException({
          message: 'Email or password is incorrect',
          code: 400,
        });
      }

      const accessToken = await this.signToken({
        id: findUser.id,
        email: findUser.email,
      } as User);

      return {
        user: findUser,
        accessToken,
      };
    } catch (error) {
      resolveError(error);
    }
  }

  async isAdmin({ id, email }: InputPermissionRequest) {
    try {
      const findUser = await this.userRepository.findOne({
        email,
        id,
      });

      if (!findUser) {
        throw new RpcException({
          message: 'Forbidden',
          code: 403,
        });
      }

      if (findUser.role === UserRole.ADMIN) {
        return {
          isAdmin: true,
        };
      }

      return {
        isAdmin: false,
      };
    } catch (error) {
      resolveError(error);
    }
  }

  async signToken(user: User) {
    return sign(user, 'abc');
  }
}
