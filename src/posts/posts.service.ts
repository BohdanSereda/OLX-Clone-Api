import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreatePostDto } from './dto/create-post.dto';
import { IGetUserAuthInfoRequest } from './dto/custom-request.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDataBaseService } from './posts.database.service';



@Injectable()
export class PostsService {
  constructor(@Inject(REQUEST) private readonly request: IGetUserAuthInfoRequest,
              private readonly postDataBaseService: PostDataBaseService){}

  
  async create(images: Array<Express.Multer.File>, createPostDto: CreatePostDto) {
    const user = this.request.user    
    return await this.postDataBaseService.createPost(createPostDto, user, images)
     
  }

  async findUserPosts() {
    const user = this.request.user  
    return await this.postDataBaseService.findPostsByUserId(user.id)
  }

  async deactivate(postId: number) {
    const user = this.request.user  
    return  await this.postDataBaseService.deactivate(postId, user.id)
  }

  async update(postId: number, updatePostDto: UpdatePostDto, images) {
    const user = this.request.user  
    return await this.postDataBaseService.updatePost(updatePostDto, postId, user.id, images)
  }

  async remove(postId: number) {
    const user = this.request.user  
    return await this.postDataBaseService.removePost(postId, user.id)
  }

  async findAll(query){
    return await this.postDataBaseService.findAllPosts(query)
  }
}
