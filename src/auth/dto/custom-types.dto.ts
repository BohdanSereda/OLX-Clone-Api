import { ApiProperty } from '@nestjs/swagger';
import {  IsString } from 'class-validator'

export class Token {
    @IsString()
    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp4eXNlcmVkYS5ib2Rpa0BnbWFpbC5jb20iLCJpZCI6NCwiYWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2NjM5Mzk4NzcsImV4cCI6MTY2NDAyNjI3N30.oKfpwfhmdnEcoGV8Hz9IaJuOAZMWXU6ZVYI78Wpv4iY", type: String, description: 'bearer token'})
    readonly token: string;
}

export class ActivationMessage  {
    @ApiProperty({example: "It's you! Your email address has been successfully verified.", type: String, description: 'activation message'})
    activationMessage: string
}