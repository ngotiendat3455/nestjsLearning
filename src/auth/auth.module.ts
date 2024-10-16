import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';

@Module({
  providers: [
    AuthService, {
      provide: HashingProvider,
      useClass: BcryptProvider,
    }, SignInProvider,
  ],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [forwardRef(() => UsersModule)],
})
export class AuthModule {}
