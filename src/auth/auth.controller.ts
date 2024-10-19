import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/singin.dto';
import { AuthService } from './providers/auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enum/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('sign-in')
    @Auth(AuthType.None)
    public async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @Post('refresh-tokens')
    @Auth(AuthType.None)
    public async refreshTokesn(@Body() refreshTokenDto:RefreshTokenDto){
        return this.authService.refreshTokens(refreshTokenDto)
    }
}
