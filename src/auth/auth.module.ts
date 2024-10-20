import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokens } from './providers/generate-tokens';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { GoogleAuthenticationService } from './social/providers/google-authentication.service/google-authentication.service';
import { GoogleAuthenticationController } from './social/google-authentication.controller';

import jwtConfig from 'src/config/jwt.config';

@Module({
  providers: [
    AuthService, SignInProvider, {
      provide: HashingProvider,
      useClass: BcryptProvider,
    }, GenerateTokens, RefreshTokensProvider, GoogleAuthenticationService, 
  ],
  controllers: [AuthController, GoogleAuthenticationController],
  exports: [AuthService, HashingProvider],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
