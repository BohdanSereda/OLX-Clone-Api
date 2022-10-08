import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Test, TestingModule } from '@nestjs/testing';
import { QueryFilterDto } from './dto/post-query.dto';
import { PostDataBaseService } from './posts.database.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AccountValidationGuard } from '../auth/account-activation.guard';
import { CreatePostDto } from './dto/create-post.dto';
const { Readable } = require('stream');

describe('PostsController', () => {
    const mockPostDto: CreatePostDto = {
        name: 'Car',
        category: 'cars',
        description: 'Very cool car',
        price: 28000,
        condition: 'Old car',
        address: 'Lviv, Naukova 36/9',
        phone: '+380734162069',
    };
    const mockImages: Array<Express.Multer.File> = [
        {
            fieldname: 'images',
            originalname: 'test1.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: './images',
            filename: 'test1.jpg',
            path: 'images\\test1.jpg',
            size: 32919,
            stream: Readable(),
            buffer: new Buffer('test'),
        },
        {
            fieldname: 'images',
            originalname: 'kuga.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination: './images',
            filename: 'kuga.png',
            path: 'images\\kuga.png',
            size: 211910,
            stream: Readable(),
            buffer: new Buffer('test'),
        },
    ];
    const mockPost = {
        id: 1,
        ...mockPostDto,
        images: [
            'https://olx-amazing-clone.s3.eu-central-1.amazonaws.com/194-kuga.png',
            'https://olx-amazing-clone.s3.eu-central-1.amazonaws.com/194-test1.jpg',
        ],
        activated: true,
        user: {
            id: 14,
            email: 'bob123@gmail.com',
            password:
                '$2a$05$B80YxET8/6tiYngjDf9ps.sgyF/SrD/fIYANAROt5fPE64gg2ASBu',
            activated: true,
            activationLink: 'ee4e1fa3-f822-4fac-83f8-037479a0284f',
        },
    };
    const mockDeactivatedPost = { ...mockPost, activated: false };
    const mockPosts = Promise.resolve([mockPost]);
    const mockQuery = '' as unknown as QueryFilterDto;

    let mockUserService = {
        findAll: jest.fn(() => mockPosts),
        create: jest.fn(() => Promise.resolve(mockPost)),
        findUserPosts: jest.fn(() => mockPosts),
        update: jest.fn((updates) => {
            return Object.assign(mockPosts, updates);
        }),
        deactivate: jest.fn(() => mockDeactivatedPost),
        remove: jest.fn(() => mockPost),
    };
    let postsController: PostsController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [PostDataBaseService, PostsService],
        })
            .overrideProvider(PostsService)
            .useValue(mockUserService)
            .overrideProvider(PostDataBaseService)
            .useValue({})
            .overrideGuard(AccountValidationGuard)
            .useValue({})
            .overrideGuard(JwtAuthGuard)
            .useValue({})
            .compile();
        postsController = module.get<PostsController>(PostsController);
    });

    it('should be defined', () => {
        expect(postsController).toBeDefined();
    });

    it('should return array of posts', async () => {
        expect(await postsController.findAll(mockQuery)).toEqual(
            await mockPosts,
        );
    });

    it("should create user's  new post", async () => {
        expect(await postsController.create(mockImages, mockPostDto)).toEqual(
            await Promise.resolve(mockPost),
        );
    });

    it("should return user's posts", async () => {
        expect(await postsController.findUserPosts()).toEqual(await mockPosts);
    });

    it("should update user's post", async () => {
        expect(
            await postsController.update(mockImages, '1', mockPostDto),
        ).toEqual(await mockPosts);
    });

    it("should deactivate user's post", async () => {
        expect(await postsController.deactivate('1')).toEqual(
            await Promise.resolve(mockDeactivatedPost),
        );
    });

    it("should remove user's post", async () => {
        expect(await postsController.remove('1')).toEqual(
            await Promise.resolve(mockPost),
        );
    });
});
