import { forwardRef, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../entities';
import { CvsModule } from '../cvs/cvs.module';

@Module({
  imports: [MikroOrmModule.forFeature([User]), forwardRef(() => CvsModule)],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
