import { Test, TestingModule } from '@nestjs/testing';
import { PostDataBaseService } from './posts.database.service';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { AuthModule } from '../auth/auth.module';
import { S3Module } from '../S3/S3.module';
import { UsersModule } from '../users/users.module';

describe('PostsService', () => {
    let postsService: PostsService;
    let postDataBaseService: PostDataBaseService;
    const mockPostRepository ={ }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                S3Module,
            ],
            providers: [
                PostDataBaseService,
                {
                    provide: getRepositoryToken(Post),
                    useValue: mockPostRepository,
                },
                PostsService,
            ],
        }).compile();
        postsService = module.get<PostsService>(PostsService);
        postDataBaseService =
            module.get<PostDataBaseService>(PostDataBaseService);
    })
    it('should be defined', () => {
        expect(postsService).toBeDefined();
    });
});
