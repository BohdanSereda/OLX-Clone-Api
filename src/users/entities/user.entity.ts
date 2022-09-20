import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{

    @ApiProperty({example: 1, type: String, description: 'user id'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: "bob123@gmail.com", type: String, description: 'user email'})
    @Column({unique: true, nullable: false})
    email: string

    @ApiProperty({example: "SecretPassword/123", type: String, description: 'user password'})
    @Column({nullable: false})
    password: string
    
    @ApiProperty({example: false,  type: Boolean, description: 'user activation status'})
    @Column({nullable: false, default: false})
    activated: boolean
}
