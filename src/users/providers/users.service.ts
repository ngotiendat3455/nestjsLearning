import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user-dto";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";

@Injectable()
export class UserService {
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

    public findOneById(id: number) {
        return {
            id: 1234,
            name: 'Alice',
            email: 'alice@doe.com'
        }
    }
}