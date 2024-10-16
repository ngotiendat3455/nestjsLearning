import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './providers/users.service';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatchUserDto } from './dtos/path-user-dto';
import { CreateUserDto } from './dtos/create-user-dto';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

@ApiTags("users")
@Controller('users')
export class UsersController {

    constructor(
        private readonly userService:UserService
    ){}

    @ApiOperation({
        summary: 'Fetches a list of registered users on the application.'
      })
    @ApiQuery({
        name: 'limit',
        type: String,
        description: 'The upper limit of pages you want the pagination to return',
        required: false,
      })
    @ApiQuery({
        name: 'page',
        type: String,
        description:
          'The position of the page number that you want the API to return',
        required: false,
      })
      @ApiResponse({
        status: 200,
        description: 'Users fetched successfully based on the query',
      })
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
    public createUsers(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto) {
        return patchUserDto;
    }

    @Post('create-many')
    public createManyUser(@Body() createManyUsersDto: CreateManyUsersDto){
      return this.userService.createMany(createManyUsersDto)
    }
}
