import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber,  Min } from 'class-validator';
import { IsBiggerThan } from '../helpers/custom-validation.helper';
import { CategoryType } from './custom-types.dto';

export class QueryFilterDto {
    @Type(() => Number)
    @IsNumber()
    @Min(0)
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

    @ApiProperty({
        type: 'number',
        example: 200,
        required: false,
        description: "good's max price",
    })
    readonly maxPrice?: Number;

    @ApiProperty({
        type: 'string',
        example: 'Google',
        required: false,
        description: "good's name",
    })
    readonly name?: String;

    @ApiProperty({
        type: 'string',
        example: 'Get a new',
        required: false,
        description: "good's description",
    })
    readonly description?: String;

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

    @IsIn(['pets', 'cars', 'electronics', 'realty', 'clothing', 'other'])
    @ApiProperty({
        type: 'CategoryType',
        example: 'cars',
        required: false,
        description: "good's category",
    })
    category: CategoryType;
}
