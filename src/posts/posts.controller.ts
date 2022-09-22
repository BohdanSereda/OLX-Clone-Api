import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { FilesInterceptor } from '@nestjs/platform-express';
import { apiBodySchema, filesInterceptorConfig } from './helpers/file.helper';
import { AccountActivationGuard } from 'src/auth/account-activation.guard';

@UseGuards(JwtAuthGuard)
@UseGuards(AccountActivationGuard)
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @Post()
  @UseInterceptors(FilesInterceptor(...filesInterceptorConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody(apiBodySchema)
  create(@UploadedFiles() images: Array<Express.Multer.File>, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(images, createPostDto);    
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor(...filesInterceptorConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody(apiBodySchema)
  @Patch(':id')
  update(@UploadedFiles() images: Array<Express.Multer.File>, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto, images);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
