import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreatePostDto } from './dto/create-post.dto';
import { IGetUserAuthInfoRequest } from './dto/custom-request.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { unlinkFile } from './helpers/file.helper';
import { S3Service } from './S3.service';



@Injectable()
export class PostsService {
  constructor(@Inject(REQUEST) private readonly request: IGetUserAuthInfoRequest,
              private readonly s3Service: S3Service){}

  
  async create(images: Array<Express.Multer.File>, createPostDto: CreatePostDto) {
    const user = this.request.user
    console.log(user);
    
    const result = await this.s3Service.upload(images)
    console.log(result);
    for (const image of images) {      
      await unlinkFile(image.path)
    }    
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
