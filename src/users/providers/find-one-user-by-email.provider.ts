import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ){}

    public async findOneByEmail(email: string) {
        let user: User = undefined;
        try {
            user = await this.usersRepository.findOneBy({
                email: email,
            })
        } catch (error) {
            throw new RequestTimeoutException(error, {
              description: 'Could not fetch the user',
            });
          }
        if (!user) {
            throw new UnauthorizedException('User does not exists');
        }
        
        return user;
    }
}
