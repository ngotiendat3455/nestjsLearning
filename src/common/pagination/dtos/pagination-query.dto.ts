import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    limit?: number = 10;

    @IsOptional()
    @IsPositive()
    offset?: number = 1;
}