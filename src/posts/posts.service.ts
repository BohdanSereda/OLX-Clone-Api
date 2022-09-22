import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreatePostDto } from './dto/create-post.dto';
import { IGetUserAuthInfoRequest } from './dto/custom-request.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import * as fsExtra from 'fs-extra'
import { PostDataBaseService } from './posts.database.service';
import { S3Service } from './S3.service';



@Injectable()
export class PostsService {
  constructor(@Inject(REQUEST) private readonly request: IGetUserAuthInfoRequest,
              private readonly s3Service: S3Service,
              private readonly postDataBaseService: PostDataBaseService){}

  
  async create(images: Array<Express.Multer.File>, createPostDto: CreatePostDto) {
    const user = this.request.user    
    const post = await this.postDataBaseService.createPost(createPostDto, user, images)
    fsExtra.emptyDir('images')
    return post
  }

  async findAll() {
    const user = this.request.user  
    return await this.postDataBaseService.findPostsByUserId(user.id)
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
