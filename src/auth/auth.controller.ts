import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/singin.dto';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('sign-in')
    public async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }
}
