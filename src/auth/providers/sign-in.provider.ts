import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dto/singin.dto';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokens } from './generate-tokens';

@Injectable()
export class SignInProvider {
    constructor(
        // Injecting UserService
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,
        /**
         * Inject the hashingProvider
         */
        private readonly hashingProvider: HashingProvider,
        /**
         * Inject the generateTokens
         */
        private readonly generateTokens: GenerateTokens
    ) {}

public async signIn(signInDto: SignInDto) {
    // find user by email Id
    const user = await this.usersService.findOneByEmail(signInDto.email);
    // throw exception if user not found
    let isEqual: boolean = false;
    // compare password to hash
    console.log('user.password', user.password);
    console.log('signInDto.password', signInDto.password);
    try {
        isEqual = await this.hashingProvider.comparePassword(signInDto.password, user.password)
    } catch(error) {
        throw new RequestTimeoutException(error, {
            description: 'Could not compare the password',
          });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    // Generate access token
    const {
      accessToken,
      refreshToken
    } = await this.generateTokens.generateToken(user)
    // Send confirmation
    return { accessToken, refreshToken };
    }
}
