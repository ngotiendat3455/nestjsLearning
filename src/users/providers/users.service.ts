import { BadRequestException, HttpException, HttpStatus, Injectable, RequestTimeoutException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user-dto";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly configService: ConfigService,
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
        const environment = this.configService.get<string>('S3_BUCKET');
        console.log(environment);
        let loggenIn = false;
        if (!loggenIn) {
        throw new HttpException(
            {
            status: HttpStatus.MOVED_PERMANENTLY,
            error: `The API endpoint doesn't exist anymore`,
            fileName: 'users.service.ts',
            lineNumber: 103,
            },
            HttpStatus.MOVED_PERMANENTLY,
            {
            cause: new Error(),
            description:
                'Occured because the API endpoint was permanently moved to a new location',
            },
        );
        }
    }

     /**
     * Find a single user using the ID of the user
     */
    public async findOneById(id: number) {
        try {
            return await this.usersRepository.findOneBy({
              id,
            });
          } catch (e) {
            throw new RequestTimeoutException(
              'Unable to process your request at the moment please try later',
              {
                description: 'Error connecting to database',
              },
            );
          }
    }

    public async createUser(createUserDto: CreateUserDto) {
        // const environment = this.configService.get<string>('S3_BUCKET');
        // console.log(environment);
        // check if user with email exists
        let existingUser = undefined;
        try{
            existingUser = await this.usersRepository.findOne({
                where: { email: createUserDto.email }
            })
        } catch(error){
            // Might want to save these errors with more information in a log file or database
            // You don't need to send this sensitive information to user
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
                {
                    description: 'Error connecting to database'
                }
            )
        }

          /**
         * Handle exceptions if user exists later
         * */
        if (existingUser) {
            throw new BadRequestException(
            'The user already exists, please check your email',
            );
        }
        /**
         * handle exception if user exists later
         */

        let user = this.usersRepository.create(createUserDto);
        try {
            user = await this.usersRepository.save(user);
        } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
                {
                    description: 'Error connecting to database'
                }
            )
        }

        return user;
    }
}