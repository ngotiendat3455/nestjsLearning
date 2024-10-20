import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {
    constructor(
        /**
         * inject usersReponsitory
         */
        @InjectRepository(User)
        private readonly usersReponsitory: Repository<User>
    ){}

    public async findOneByGoogleId(googleId: string){
        return await this.usersReponsitory.findOneBy({
            googleId: googleId
        })
    }
}
