import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user-dto";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UserService {
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
    public findOneById(id: number) {
        return {
            id: 1234,
            name: 'Alice',
            email: 'alice@doe.com'
        }
    }
}