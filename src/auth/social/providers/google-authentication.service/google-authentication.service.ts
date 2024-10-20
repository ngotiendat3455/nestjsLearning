import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/config/jwt.config';
import { GoogleTokenDto } from '../../dtos/google-token.dto';
import { UserService } from 'src/users/providers/users.service';
import { GenerateTokens } from 'src/auth/providers/generate-tokens';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit{
    private oauthClient: OAuth2Client;

    constructor(
        /**
         * Inject jwtConfiguration
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly generateToken: GenerateTokens
      ) {}

    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;
        this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }
    async authenticate(googleTOkenDto: GoogleTokenDto) {
        // verify the google token sent by user
        const loginToken = await this.oauthClient.verifyIdToken({
            idToken: googleTOkenDto.token
        })
        console.log('login token', loginToken);
        // extract the payload from the google token 
        const { 
            email, 
            sub: googleId,
            given_name: firstName,
            family_name: lastName,
        } = loginToken.getPayload();
        // if user id found generate the tokens 
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(googleId);
        const user = await this.userService.findOneByGoogleId(googleId);
        if (user) {
            return await this.generateToken.generateToken(user);
        }
         // If not create a new user and generate the tokens
         // throw Unauthorised exception if not Authorised
    }
}
