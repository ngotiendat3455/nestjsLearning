import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { SignInDto } from '../dto/singin.dto';

@Injectable()
export class AuthService {
    constructor(
        // Injecting UserService
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,
        private readonly authService: AuthService,
    ) { }
    
    public isAuth() {
        return true;
    }

    public async signIn(signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }
}
