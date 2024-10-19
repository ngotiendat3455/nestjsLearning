import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { SignInDto } from '../dto/singin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
    constructor(
        private readonly signInProvider: SignInProvider,
        private readonly refreshTokenProvder: RefreshTokensProvider
    ) { }
    
    public isAuth() {
        return true;
    }

    public async signIn(signInDto: SignInDto) {
        return this.signInProvider.signIn(signInDto)
    }

    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        return this.refreshTokenProvder.refreshToken(refreshTokenDto);
    }
}
