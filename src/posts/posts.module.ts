import { Module, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from './S3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule, 
    UsersModule
  ],
  controllers: [PostsController],
  providers: [PostsService, S3Service]
})
export class PostsModule {}
