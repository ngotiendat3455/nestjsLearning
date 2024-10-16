import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { GetPostsDto } from '../dtos/get-post.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Injectable()
export class PostsService {
    constructor(
      private readonly tagsService: TagsService,
      /*
      * Injecting Users Service
      */
      private readonly usersService: UserService,
      @InjectRepository(Post)
      private readonly postReponsitory: Repository<Post>,
      /**
       * Inject the paginationProvider
       */
      private readonly paginationProvider: PaginationProvider,
      // @InjectRepository(MetaOption)
      // private readonly metaOptionsRepository: Repository<MetaOption>,
    ) {}

    public async findAll(userId: string, postQuery: GetPostsDto) {
        let posts = await this.paginationProvider.paginationQuery(postQuery, this.postReponsitory);
      return posts;
    }

    public async create(createPostDto: CreatePostDto) {
      let author = await this.usersService.findOneById(createPostDto.authorId);
      let tags = await this.tagsService.findMultipleTags(createPostDto.tags);
      let post = this.postReponsitory.create({
        ...createPostDto,
        author: author,
        tags
      });
      console.log('post', post);
      return await this.postReponsitory.save(post);
    }

    public async delete(id: number) {
      let post = await this.postReponsitory.findOneBy({ id });

      await this.postReponsitory.delete(id);
      //  await this.metaOptionsRepository.delete(post.metaOptions.id);
      return { delete: true, id};
    }
}
