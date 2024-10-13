import { IsEmpty, IsJSON } from "class-validator";

export class CreatePostMetaOptionsDto {
    @IsEmpty()
    @IsJSON()
    metaValue: string;
}