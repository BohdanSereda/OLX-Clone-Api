import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsString, IsNotEmpty, IsIn, IsNumber, IsPhoneNumber, IsNumberString } from "class-validator"
import { CategoryType } from "./custom-types.dto"

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Car',  type: String, description: 'good\'s name'})
    name: string

    @IsString()
    @IsNotEmpty()
    @IsIn(['pets', 'cars', 'electronics', 'realty','clothing', 'other'])
    @ApiProperty({example: 'cars',  type: "CategoryType", description: 'good\'s category'})
    category: CategoryType

    @IsString()
    @ApiProperty({example: 'Very cool car',  type: String, description: 'good\'s description'})
    description: string
    
    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({example: 28000,  type: Number, description: 'good\'s price'})
    price: number

    @IsString()
    @ApiProperty({example: 'New',  type: String, description: 'good\'s condition'})
    condition: string

    @IsString()
    @ApiProperty({example: 'Lviv, Naukova 36/9',  type: String, description: 'user\'s address'})
    address: string

    @IsString()
    @IsPhoneNumber()
    @ApiProperty({example: '+380734162069',  type: String, description: 'user\'s phone number'})
    phone: string
}
