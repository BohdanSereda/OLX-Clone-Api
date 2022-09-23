import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./entities/post.entity";
import { QueryHelper } from "./helpers/query.helper";
import { S3Service } from "../S3/S3.service";

@Injectable()
export class PostDataBaseService{
    constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>,
                private readonly s3Service: S3Service,
                ){}

    async createPost(createPostDto: CreatePostDto, user: User, images: Array<Express.Multer.File>){
        const post = {...createPostDto, user}
        const rawSawedPost = await this.postRepository.save(post)
        const s3Images = await this.s3Service.upload(images, rawSawedPost.id)
        const imagesLinks = s3Images.map(image => image.Location)
        return await this.postRepository.save({...rawSawedPost, images: imagesLinks})
    }

    async findPostsByUserId(userId){
        return await this.postRepository.findBy({user: userId})
    }

    async updatePost(postUpdatesDto, postId, userId, images){
        const post = await this.postRepository.findOneBy({id:+postId, user: userId})
        if(!post){
            return false
        }
        if (images) {
            const s3Images = await this.s3Service.update(images, postId, post.images)
            const imagesLinks = s3Images.map(image => image.Location)
            const updatedPost = {...Object.assign(post, postUpdatesDto), images: imagesLinks}
            return await this.postRepository.save(updatedPost)
        }
        const updatedPost = Object.assign(post, postUpdatesDto)
        return await this.postRepository.save(updatedPost)
    }

    async deactivate(postId, userId){
        const post = await this.postRepository.findOneBy({id:+postId, user: userId})
        if(!post){
            return false
        }
        post.active = false
        return await this.postRepository.save(post)
    }

    async removePost(postId: number, userId){
        const post = await this.postRepository.findOneBy({id: postId, user: userId})
        if(!post){
            return false
        }
        await this.s3Service.remove(post.images)
        return await this.postRepository.remove(post)
    }

    async findAllPosts(query){
        const resultQuery = QueryHelper.queryBuilder(query)
        const result = await this.postRepository.find(resultQuery)
        return result
    }
}