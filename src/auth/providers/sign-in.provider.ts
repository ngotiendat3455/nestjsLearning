import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dto/singin.dto';

@Injectable()
export class SignInProvider {
    constructor(
        // Injecting UserService
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,
        /**
         * Inject the hashingProvider
         */
        private readonly hashingProvider: HashingProvider,
    ) {}

public async signIn(signInDto: SignInDto) {
    // find user by email Id
    const user = await this.usersService.findOneByEmail(signInDto.email);
    // throw exception if user not found
    let isEqual: boolean = false;
    // compare password to hash

    try {
        isEqual = await this.hashingProvider.comparePassword(user.password, signInDto.password)
    } catch(error) {
        throw new RequestTimeoutException(error, {
            description: 'Could not compare the password',
          });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    // Send confirmation
    return true;
    }
}
