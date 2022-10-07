import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UseInterceptors,
    UploadedFiles,
    Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { FilesInterceptor } from '@nestjs/platform-express';
import {
    apiBodySchema,
    filesInterceptorConfig,
} from './helpers/file.helper';
import { AccountValidationGuard } from '../auth/account-activation.guard';
import { Post as PostEntity } from './entities/post.entity';
import { QueryFilterDto } from './dto/post-query.dto';
import { ParseFiles } from './helpers/custom-validation.helper';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @ApiBearerAuth()
    @UseGuards(AccountValidationGuard)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor(...filesInterceptorConfig))
    @ApiConsumes('multipart/form-data')
    @ApiBody(apiBodySchema)
    @ApiOperation({ summary: 'Post creation' })
    @ApiResponse({
        status: 201,
        description: "create user's post",
        type: PostEntity,
    })
    @ApiResponse({ status: 500, description: 'something went wrong' })
    @Post()
    create(
        @UploadedFiles(ParseFiles) images: Array<Express.Multer.File>,
        @Body() createPostDto: CreatePostDto,
    ): Promise<PostEntity | false> {
        return this.postsService.create(images, createPostDto);
    }

    @ApiBearerAuth()
    @UseGuards(AccountValidationGuard)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Post finding' })
    @ApiResponse({
        status: 201,
        description: "find user's posts",
        type: [PostEntity],
    })
    @ApiResponse({ status: 500, description: 'something went wrong' })
    @Get('my')
    findUserPosts(): Promise<PostEntity[]> {
        return this.postsService.findUserPosts();
    }

    @ApiBearerAuth()
    @UseGuards(AccountValidationGuard)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor(...filesInterceptorConfig))
    @ApiConsumes('multipart/form-data')
    @ApiBody(apiBodySchema)
    @ApiOperation({ summary: 'Post update' })
    @ApiResponse({
        status: 201,
        description: "update user's post",
        type: PostEntity,
    })
    @ApiResponse({ status: 500, description: 'something went wrong' })
    @ApiResponse({ status: 404, description: 'not found' })
    @Patch(':id')
    update(
        @UploadedFiles(ParseFiles) images: Array<Express.Multer.File>,
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        return this.postsService.update(+id, updatePostDto, images);
    }

    @ApiBearerAuth()
    @UseGuards(AccountValidationGuard)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Post deactivation' })
    @ApiResponse({
        status: 201,
        description: "deactivate user's post",
        type: PostEntity,
    })
    @ApiResponse({ status: 500, description: 'something went wrong' })
    @ApiResponse({ status: 404, description: 'not found' })
    @Patch('deactivate/:id')
    deactivate(@Param('id') id: string) {
        return this.postsService.deactivate(+id);
    }

    @ApiBearerAuth()
    @UseGuards(AccountValidationGuard)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Post delete' })
    @ApiResponse({
        status: 201,
        description: "deletes user's post",
        type: PostEntity,
    })
    @ApiResponse({ status: 500, description: 'something went wrong' })
    @ApiResponse({ status: 404, description: 'not found' })
    @Delete(':id')
    remove(@Param('id') id: string): Promise<PostEntity> {
        return this.postsService.remove(+id);
    }

    @ApiOperation({ summary: 'Post finding' })
    @ApiResponse({
        status: 201,
        description: 'find all posts',
        type: [PostEntity],
    })
    @ApiResponse({ status: 500, description: 'something went wrong' })
    @Get()
    findAll(@Query() query: QueryFilterDto): Promise<PostEntity[]> {
        return this.postsService.findAll(query);
    }
}
