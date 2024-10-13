import { Body, Controller } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagService: TagsService
    ){}

    public async create(@Body() createTagDto: CreateTagDto){
        return this.tagService.create(createTagDto);
    }
}
