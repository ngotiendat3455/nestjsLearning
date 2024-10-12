import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
    constructor(
        // Injecting UserService
        private readonly usersService: UserService,
    ) { }
    public login(email: string, password: string, id: string) {
        const user = this.usersService.findOneById(1234);
        // login
        return 'SAMPLE_TOKEN';
    }
    public isAuth() {
        return true;
    }
}
