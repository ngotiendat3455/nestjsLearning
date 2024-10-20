import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user-dto";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entity";
import { DataSource, Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { FindOneUserByEmailProvider } from "./find-one-user-by-email.provider";
import { CreateManyUsersDto } from "../dtos/create-many-users.dto";
import { HashingProvider } from "src/auth/providers/hashing.provider";
import { FindOneByGoogleIdProvider } from "./find-one-by-google-id.provider";

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly configService: ConfigService,
        /**
         * inject the datasource
         */
        private dataSource: DataSource,
        /**
         * Inject findOneUserByEmailProvider
         */
        private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
        /**
         * Inject BCrypt Provider
         */
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
        /**
         * inject  findOneByGoogleId
         */
        private readonly findOneGoogleId: FindOneByGoogleIdProvider
    ){

    }
    public async createMany(createUserDto: CreateManyUsersDto) {
        let newUsers: User[] = [];
        // create query runner
        const queryRunner = this.dataSource.createQueryRunner();
        // connect db
        await queryRunner.connect();
        // start transaction
        await queryRunner.startTransaction();

        try {
            for (let user of createUserDto.users) {
                let newUser = queryRunner.manager.create(User, user);
                let result = await queryRunner.manager.save(newUser);
                newUsers.push(result);
              }
            // commit
            await queryRunner.commitTransaction();
        } catch(error) {
            //error when excute
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

        return newUsers;
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

        let user = this.usersRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password),
        });
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

    // Finds one user by email
    public async findOneByEmail(email: string) {
        return await this.findOneUserByEmailProvider.findOneByEmail(email);
    }

    // find one by googleId
    public async findOneByGoogleId(googleId: string) {
        return await this.findOneGoogleId.findOneByGoogleId(googleId);
    }
}