import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryType } from "../dto/custom-types.dto";

@Entity()
export class Post {
    @ApiProperty({example: 1,  type: Number, description: 'post id'})
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Car',  type: String, description: 'post name'})
    @Column({nullable: false, default: ''})
    name: string

    
    @ApiProperty({example: 'cars',  type: "CategoryType", description: 'post images'})
    @Column()
    category: CategoryType

    @ApiProperty({example: [
        'https://olx-amazing-clone.s3.eu-central-1.amazonaws.com/4-d368fbebc27c6348ad741fda8f761259.jpg',
        'https://olx-amazing-clone.s3.eu-central-1.amazonaws.com/1-d368fbebc27c6348ad741fda8f761259.jpg'
    ],  type: [String], description: 'post images'})
    @Column("simple-array", {nullable: true})
    images: string[]


    @ApiProperty({example: 'Very cool car',  type: String, description: 'good\'s description'})
    @Column("longtext", {nullable: true})
    description: string

    @ApiProperty({example: 28000,  type: Number, description: 'good\'s price'})
    @Column({nullable: false, default: 0})
    price: number

    @ApiProperty({example: 'Old car',  type: String, description: 'good\'s condition'})
    @Column()
    condition: string

    @ApiProperty({example: 'Lviv, Naukova 36/9',  type: String, description: 'user\'s address'})
    @Column()
    address: string

    @ApiProperty({example: '+380734162069',  type: String, description: 'user\'s phone number'})
    @Column()
    phone: string

    @ApiProperty({example: true,  type: Boolean, description: 'post activation state'})
    @Column({nullable: false, default: true})
    active: boolean

    @ManyToOne(()=> User, user => user.posts, {onDelete: 'SET NULL'})
    user: User
}
