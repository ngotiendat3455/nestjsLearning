import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/providers/users.service';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { HashingProvider } from './hashing.provider';
import { GenerateTokens } from './generate-tokens';

@Injectable()
export class RefreshTokensProvider {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        /**
         * inject user service
         */
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        /**
         * Inject jwtService
         */
             private readonly jwtService: JwtService,
        /**
         * inject hasing provider
         */
        private readonly generateToken: GenerateTokens
    ){}
    public async refreshToken(refreshTokenDto: RefreshTokenDto){
        // verify the refresh token
        const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(refreshTokenDto.refreshToken, {
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            secret: this.jwtConfiguration.secret
        })
        // fetch user from the database
        try {
            const foundUser = await this.userService.findOneById(+sub);
            // generate the tokens
            return this.generateToken.generateToken(foundUser)
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
