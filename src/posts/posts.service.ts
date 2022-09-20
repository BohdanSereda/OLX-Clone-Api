import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreatePostDto } from './dto/create-post.dto';
import { IGetUserAuthInfoRequest } from './dto/custom-request.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@Inject(REQUEST) private readonly request: IGetUserAuthInfoRequest,){}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
