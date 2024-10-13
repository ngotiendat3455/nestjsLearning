import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-options.entity';

@Injectable()
export class PostsService {
    constructor(
      /*
     * Injecting Users Service
     */
    private readonly usersService: UserService,
      @InjectRepository(Post)
      private readonly postReponsitory: Repository<Post>,
      // @InjectRepository(MetaOption)
      // private readonly metaOptionsRepository: Repository<MetaOption>,
    ) {}

    public async findAll(userId: string) {
        let posts = await this.postReponsitory.find({
          relations: {
            metaOptions: true
          }
        })
      return posts;
    }

    public async create(createPostDto: CreatePostDto) {
      let author = await this.usersService.findOneById(createPostDto.authorId);

      let post = this.postReponsitory.create({
        ...createPostDto,
        author: author,
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
