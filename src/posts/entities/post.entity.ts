import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @ApiProperty({example: 1,  type: Number, description: 'post id'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Car',  type: String, description: 'post name'})
    @Column({nullable: false, default: ''})
    name: string

    
    @ApiProperty({example: '......',  type: String, description: 'post images'})
    @Column()
    category: string

    @ApiProperty({example: '......',  type: [String], description: 'post images'})
    @Column("simple-array", {nullable: true})
    images: string[]


    @ApiProperty({example: 'Very cool car',  type: String, description: 'post description'})
    @Column("longtext", {nullable: true})
    description: string

    @ApiProperty({example: 28000,  type: Number, description: 'post price'})
    @Column()
    price: number

    @Column()
    condition: string

    @Column()
    address: string

    @Column()
    phone: string
}
