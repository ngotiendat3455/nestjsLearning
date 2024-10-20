import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from 'src/auth/guards/authentication/authentication.guard';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UserService, 
    FindOneUserByEmailProvider, FindOneByGoogleIdProvider,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthenticationGuard,
    // },
  ],
  exports: [UserService],
  imports: [
    forwardRef(() => AuthModule), 
    TypeOrmModule.forFeature([User]),
  ],
})
export class UsersModule {}
