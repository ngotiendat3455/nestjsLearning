import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneByGoogleIdProvider {
    constructor(
        /**
         * inject usersReponsitory
         */
        private readonly usersReponsitory: Repository<User>
    ){}

    public async findOneByGoogleId(googleId: string){
        return await this.usersReponsitory.findOneBy({
            googleId: googleId
        })
    }
}
