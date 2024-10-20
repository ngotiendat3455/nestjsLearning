import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service/google-authentication.service';
import { GoogleTokenDto } from './dtos/google-token.dto';

@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
    constructor(
        /**
         * inject googleAuthenticationService
         */
        private readonly googleAuthenticationService: GoogleAuthenticationService
    ){}

    @Post()
    authenticate(@Body() googleTokenDto: GoogleTokenDto){
        return this.googleAuthenticationService.authenticate(googleTokenDto);
    }
}
