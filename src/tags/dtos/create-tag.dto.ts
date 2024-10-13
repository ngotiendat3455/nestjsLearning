import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator"

export class CreateTagDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @MinLength(3)
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
        'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
    })
    @MaxLength(512)
    slug: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsJSON()
    schema: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImag: string
}