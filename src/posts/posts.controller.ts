import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(
        private readonly postService: PostsService
    ) { }

    @Get("/:userId?")
    public getPosts(@Param("userId") userId: string) {
        return this.postService.findAll(userId)
    }

    @ApiOperation({
        summary: 'Creates a new blog post',
    })
    @ApiResponse({
        status: 201,
        description: 'You get a 201 response if your post is created successfully',
    })
    @Post()
    public createPost(@Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto);
    }

    /**
     * Route to delete a post
     */
    @Delete("/:id")
    public deletePost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.delete(id);
    }
}
