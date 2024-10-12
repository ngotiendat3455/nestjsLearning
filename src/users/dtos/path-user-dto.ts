// import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user-dto';

export class PatchUserDto extends PartialType(CreateUserDto) {}