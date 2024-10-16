import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
// import { PostsService } from './posts.service';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { User } from 'src/users/user.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    UsersModule, 
    TypeOrmModule.forFeature([Post, User]), 
    TagsModule,
    PaginationModule,
  ]
})
export class PostsModule {}
