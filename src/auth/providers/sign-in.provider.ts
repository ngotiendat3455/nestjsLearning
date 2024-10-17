import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dto/singin.dto';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignInProvider {
    constructor(
        // Injecting UserService
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
          /**
         * Inject jwtService
         */
        private readonly jwtService: JwtService,
        /**
         * Inject the hashingProvider
         */
        private readonly hashingProvider: HashingProvider,
    ) {}

public async signIn(signInDto: SignInDto) {
    // find user by email Id
    const user = await this.usersService.findOneByEmail(signInDto.email);
    // throw exception if user not found
    let isEqual: boolean = false;
    // compare password to hash

    try {
        isEqual = await this.hashingProvider.comparePassword(user.password, signInDto.password)
    } catch(error) {
        throw new RequestTimeoutException(error, {
            description: 'Could not compare the password',
          });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    // Generate access token
    const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      );
    // Send confirmation
    return { accessToken };
    }
}
