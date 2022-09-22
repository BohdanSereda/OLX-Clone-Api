import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from './S3.service';
import { PostDataBaseService } from './posts.database.service';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule, 
    UsersModule
  ],
  controllers: [PostsController],
  providers: [PostDataBaseService, PostsService,  S3Service]
})
export class PostsModule {}
