import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { QueryHelper } from './helpers/query.helper';
import { S3Service } from '../S3/S3.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryFilterDto } from './dto/post-query.dto';

@Injectable()
export class PostDataBaseService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly s3Service: S3Service,
    ) {}

    async createPost(
        createPostDto: CreatePostDto,
        user: User,
        images: Array<Express.Multer.File>,
    ): Promise<Post | false> {
        const existingPost = await this.postRepository.findOne({
            where: { name: createPostDto.name },
        });
        if (existingPost) {
            return false;
        }
        const post = { ...createPostDto, user };
        const rawSawedPost = await this.postRepository.save(post);
        const s3Images = await this.s3Service.upload(images, rawSawedPost.id);
        const imagesLinks = s3Images.map((image) => image.Location);
        return await this.postRepository.save({
            ...rawSawedPost,
            images: imagesLinks,
        });
    }

    async findPostsByUserId(userId: number): Promise<Post[]> {
        return await this.postRepository.find({
            relations: { user: true },
            where: { user: { id: userId } },
        });
    }

    async updatePost(
        postUpdatesDto: UpdatePostDto,
        postId: number,
        userId: number,
        images: Array<Express.Multer.File>,
    ): Promise<false | Post> {
        const post = await this.postRepository.findOne({
            relations: { user: true },
            where: { id: postId, user: { id: userId } },
        });

        if (!post) {
            return false;
        }
        if (images) {
            const s3Images = await this.s3Service.update(
                images,
                postId,
                post.images,
            );
            const imagesLinks = s3Images.map((image) => image.Location);
            const updatedPost = {
                ...Object.assign(post, postUpdatesDto),
                images: imagesLinks,
            };
            return await this.postRepository.save(updatedPost);
        }
        const updatedPost = Object.assign(post, postUpdatesDto);
        return await this.postRepository.save(updatedPost);
    }

    async deactivate(postId: number, userId: number): Promise<Post | false> {
        const post = await this.postRepository.findOne({
            relations: { user: true },
            where: { id: postId, user: { id: userId } },
        });
        if (!post) {
            return false;
        }
        post.activated = false;
        return await this.postRepository.save(post);
    }

    async removePost(postId: number, userId: number) {
        const post = await this.postRepository.findOne({
            relations: { user: true },
            where: { id: postId, user: { id: userId } },
        });
        if (!post) {
            return false;
        }
        await this.s3Service.remove(post.images);
        return await this.postRepository.remove(post);
    }

    async findAllPosts(query: QueryFilterDto): Promise<Post[]> {
        const resultQuery = QueryHelper.queryBuilder(query);
        const result = await this.postRepository.find(resultQuery);
        return result;
    }
}
