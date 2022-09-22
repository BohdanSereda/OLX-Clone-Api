import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryType } from "../dto/custom-types.dto";

@Entity()
export class Post {
    @ApiProperty({example: 1,  type: Number, description: 'post id'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Car',  type: String, description: 'post name'})
    @Column({nullable: false, default: ''})
    name: string

    
    @ApiProperty({example: '......',  type: "CategoryType", description: 'post images'})
    @Column()
    category: CategoryType

    @ApiProperty({example: '......',  type: [String], description: 'post images'})
    @Column("simple-array", {nullable: true})
    images: string[]


    @ApiProperty({example: 'Very cool car',  type: String, description: 'post description'})
    @Column("longtext", {nullable: true})
    description: string

    @ApiProperty({example: 28000,  type: Number, description: 'post price'})
    @Column({nullable: false, default: 0})
    price: number

    @Column()
    condition: string

    @Column()
    address: string

    @Column()
    phone: string

    @Column({nullable: false, default: true})
    active: boolean

    @ManyToOne(()=> User, user => user.posts, {onDelete: 'SET NULL'})
    user: User
}
