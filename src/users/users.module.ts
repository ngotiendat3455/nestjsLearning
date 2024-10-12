import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {}
