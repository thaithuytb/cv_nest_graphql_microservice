import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { User } from '../entities';
import { hash, verify } from 'argon2';
import { LoginDto, RegisterDto } from './dto';
import { sign } from 'jsonwebtoken';
import { InfoUserInput } from '../types/inputs/infoUserInput';
import { CvsService } from '../cvs/cvs.service';
import resolveError from '../errors/error';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @Inject(forwardRef(() => CvsService))
    private readonly cvsService: CvsService,
  ) {}

  async updateUser(email: string, { username, age }: InfoUserInput) {
    try {
      const findUser = await this.getUserByEmail(email);
      if (!findUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const updateUser = await this.userRepository.assign(
        findUser,
        {
          username: username ? username : findUser.username,
          age: age ? age : findUser.age,
        },

        { merge: true },
      );

      await this.userRepository.flush();

      return updateUser;
    } catch (error) {
      resolveError(error);
    }
  }

  async register(registerInput: RegisterDto) {
    const { email, password } = registerInput;

    try {
      const findUser = await this.getUserByEmail(email);

      if (findUser) {
        throw new HttpException('Email is existed', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await hash(password);

      const newUser = new User();
      newUser.email = email;
      newUser.password = hashedPassword;

      const userDb = await this.userRepository.create(newUser);

      await this.userRepository.persistAndFlush(userDb);

      const token = await this.signToken({
        id: userDb.id,
        email: userDb.email,
      } as User);

      return {
        user: userDb,
        token,
      };
    } catch (error) {
      resolveError(error);
    }
  }

  async login(loginInput: LoginDto) {
    const { email, password } = loginInput;
    try {
      const findUser = await this.getUserByEmail(email);

      if (!findUser) {
        throw new HttpException(
          'Email or password is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }

      const correctPassword = await verify(findUser.password, password);
      if (!correctPassword) {
        throw new HttpException(
          'Email or password is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }

      const token = await this.signToken({
        id: findUser.id,
        email: findUser.email,
      } as User);

      return {
        user: findUser,
        token,
      };
    } catch (error) {
      resolveError(error);
    }
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      email,
    });
  }

  async signToken(user: User) {
    return sign(user, 'abc');
  }
  //parent
  async findCvsByUserId(user_id: number) {
    return await this.cvsService.getCvsByUserId(user_id);
  }
}
