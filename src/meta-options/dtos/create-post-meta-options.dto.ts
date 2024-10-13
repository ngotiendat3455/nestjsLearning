import { IsEmpty, IsJSON, IsNotEmpty } from "class-validator";

export class CreatePostMetaOptionsDto {
    @IsNotEmpty()
    @IsJSON()
    metaValue: string;
}