import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { EqualOperator, FindOptionsWhere, Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./entities/post.entity";
import { S3Service } from "./S3.service";

@Injectable()
export class PostDataBaseService{
    constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>,
                private readonly s3Service: S3Service,){}

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
}