import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostDataBaseService } from './posts.database.service';
import { Post } from './entities/post.entity';
import { S3Module } from 'src/S3/S3.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        AuthModule,
        UsersModule,
        S3Module,
    ],
    controllers: [PostsController],
    providers: [PostDataBaseService, PostsService],
})
export class PostsModule {}
