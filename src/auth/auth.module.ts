import { Module } from '@nestjs/common';
import { ProvidersService } from './providers/providers.service';
import { AuthServiceTsService } from './providers/auth.service.ts/auth.service.ts.service';
import { AuthService } from './providers/auth/auth.service';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { AuthServiceService } from './providers/auth.service/auth.service.service';
import { Service } from './providers/.service';
import { AuthService } from './providers/auth/auth.service';

@Module({
  providers: [ProvidersService, AuthServiceTsService, AuthService, Service, AuthServiceService],
  controllers: [AuthController]
})
export class AuthModule {}
