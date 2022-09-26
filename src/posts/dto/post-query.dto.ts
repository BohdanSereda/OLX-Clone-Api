import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { IsBiggerThan } from '../helpers/custom-validation.helper';

export class QueryFilterDto {
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @IsOptional()
    @ApiProperty({
        type: 'number',
        example: 0,
        required: false,
        description: "good's min price",
    })
    readonly minPrice?: Number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @IsBiggerThan('minPrice', {
        message: 'maxPrice must be larger than minPrice',
    })
    @IsOptional()
    @ApiProperty({
        type: 'number',
        example: 200,
        required: false,
        description: "good's max price",
    })
    readonly maxPrice?: Number;

    @IsOptional()
    @ApiProperty({
        type: 'string',
        example: 'Google',
        required: false,
        description: "good's name",
    })
    readonly name?: String;

    @IsOptional()
    @ApiProperty({
        type: 'string',
        example: 'Get a new',
        required: false,
        description: "good's description",
    })
    readonly description?: String;

    @IsOptional()
    @ApiProperty({
        type: 'string',
        example: 'Lviv',
        required: false,
        description: "user's address",
    })
    readonly address?: String;

    @ApiProperty({
        type: 'string',
        example: 'new',
        required: false,
        description: "good's condition",
    })
    readonly condition?: String;
}