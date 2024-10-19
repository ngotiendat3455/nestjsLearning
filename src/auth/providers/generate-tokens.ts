import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { User } from 'src/users/user.entity';

@Injectable()
export class GenerateTokens {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
          /**
         * Inject jwtService
         */
        private readonly jwtService: JwtService,
    ){}

    public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
              sub: userId,
              ...payload,
            },
            {
              audience: this.jwtConfiguration.audience,
              issuer: this.jwtConfiguration.issuer,
              secret: this.jwtConfiguration.secret,
              expiresIn: expiresIn,
            },
          )
    }

    public async generateToken(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken(user.id, this.jwtConfiguration.accessTokenTtl, {
                email: user.email
            }),
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl)
        ])

        return {
            accessToken,
            refreshToken,
        }
    }
}
