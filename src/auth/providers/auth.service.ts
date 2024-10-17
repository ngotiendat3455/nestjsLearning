import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { SignInDto } from '../dto/singin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
    constructor(
        private readonly signInProvider: SignInProvider
    ) { }
    
    public isAuth() {
        return true;
    }

    public async signIn(signInDto: SignInDto) {
        return this.signInProvider.signIn(signInDto)
    }
}
