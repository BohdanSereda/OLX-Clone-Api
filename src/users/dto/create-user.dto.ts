import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example: 'bob123@gmail.com',
        type: String,
        description: 'user email',
    })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'SecretPassword/123',
        type: String,
        description: 'user password',
    })
    readonly password: string;
}
