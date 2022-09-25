import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @ApiProperty({ example: 1, type: String, description: 'user id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'bob123@gmail.com',
        type: String,
        description: 'user email',
    })
    @Column({ unique: true, nullable: false })
    email: string;

    @ApiProperty({
        example: 'SecretPassword/123',
        type: String,
        description: 'user password',
    })
    @Column({ nullable: false })
    password: string;

    @ApiProperty({
        example: false,
        type: Boolean,
        description: 'user activation status',
    })
    @Column({ nullable: false, default: false })
    activated: boolean;

    @ApiProperty({
        example: '6de42631-4812-435e-84c7-6012bc89fcce',
        type: String,
        description: 'user activation link',
    })
    @Column({ nullable: false, default: '' })
    activationLink: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}
