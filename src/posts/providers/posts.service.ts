import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
    constructor(
      private readonly userService: UserService, 
      
    ) {}
    public findAll(userId: string) {
        // Users Service
        const user = this.userService.findOneById(+userId);
        // Find A User
    return [
        {
          user: user,
          title: 'Test Tile',
          content: 'Test Content',
        },
        {
            user: user,
          title: 'Test Tile 2',
          content: 'Test Content 2',
        },
      ];
    }
}
