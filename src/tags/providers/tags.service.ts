import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
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

    public async findMultipleTags(tags: number[]){
        let results = await this.tagReponsitory.find({
            where: {
                id: In(tags)
            }
        })
        return results;
    }
}
