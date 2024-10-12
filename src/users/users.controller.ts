import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UserService } from './providers/users.service';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class UsersController {

    constructor(
        private readonly userService:UserService
    ){}
    @Get("/:id?")
    public getUsers(
        @Param() getUserParamDto: GetUsersParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        // console.log(typeof id);
        console.log('limit', limit)
        return this.userService.findAll(getUserParamDto, limit, page);
    }

    @Post()
    public createUsers() {
        return 'You sent a post request to users endpoint'
    }
}
