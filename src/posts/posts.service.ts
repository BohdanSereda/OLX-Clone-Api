import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreatePostDto } from './dto/create-post.dto';
import { IGetUserAuthInfoRequest } from './dto/custom-request.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostDataBaseService } from './posts.database.service';



@Injectable()
export class PostsService {
  constructor(@Inject(REQUEST) private readonly request: IGetUserAuthInfoRequest,
    private readonly postDataBaseService: PostDataBaseService) { }

  async create(images: Array<Express.Multer.File>, createPostDto: CreatePostDto): Promise<Post> {
    try {
      const user = this.request.user
      return await this.postDataBaseService.createPost(createPostDto, user, images)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `something went wrong :(`,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findUserPosts(): Promise<Post[]> {
    try {
      const user = this.request.user
      return await this.postDataBaseService.findPostsByUserId(user.id)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `something went wrong :(`,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async deactivate(postId: number): Promise<Post> {
    try {
      const user = this.request.user
      const post = await this.postDataBaseService.deactivate(postId, user.id)
      if (!post) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `can't find post with this id: ${postId}`,
        }, HttpStatus.NOT_FOUND)
      }
      return post
    } catch (error) {
      throw new HttpException({
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error || `something went wrong :(`,
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async update(postId: number, updatePostDto: UpdatePostDto, images: Array<Express.Multer.File>): Promise<Post> {
    try {
      const user = this.request.user
      const post = await this.postDataBaseService.updatePost(updatePostDto, postId, user.id, images)
      if (!post) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `post with this id: ${postId}`,
        }, HttpStatus.NOT_FOUND)
      }
      return post
    } catch (error) {
      throw new HttpException({
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error || `something went wrong :(`,
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(postId: number): Promise<Post> {
    try {
      const user = this.request.user
      const post = await this.postDataBaseService.removePost(postId, user.id)
      if (!post) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `post with this id: ${postId}`,
        }, HttpStatus.NOT_FOUND)
      }
      return post
    } catch (error) {
      throw new HttpException({
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error || `something went wrong :(`,
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async findAll(query): Promise<Post[]> {
    try {
      return await this.postDataBaseService.findAllPosts(query)
    } catch (error) {
      throw new HttpException({
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.response.error || `something went wrong :(`,
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
