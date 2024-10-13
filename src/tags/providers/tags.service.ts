import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagReponsitory: Repository<Tag>
    ){}

    public async create(createTagDto: CreateTagDto){
        let tag = this.tagReponsitory.create(createTagDto);
        return await this.tagReponsitory.save(tag);
    }
}
