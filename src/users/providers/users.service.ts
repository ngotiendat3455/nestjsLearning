import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user-dto";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { Repository } from "typeorm";

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){

    }
    /**
   * The method to get all the users from the database
   */
    public findAll(
        getUserParamDto: GetUsersParamDto,
        limit: number,
        page: number
    ) {
        return [
            {
                firstName: 'John',
                email: 'john@doe.com',
            },
            {
                firstName: 'Alice',
                email: 'alice@doe.com',
            }
        ]
    }

     /**
     * Find a single user using the ID of the user
     */
    public async findOneById(id: number) {
       return this.usersRepository.findOneBy({
        id
       })
    }

    public async createUser(createUserDto: CreateUserDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { email: createUserDto.email }
        })

        /**
         * handle exception if user exists later
         */

        let user = this.usersRepository.create(createUserDto);
        user = await this.usersRepository.save(user);

        return user;
    }
}