import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { FilesInterceptor } from '@nestjs/platform-express';
import { apiBodySchema, filesInterceptorConfig } from './helpers/file.helper';
import { AccountActivationGuard } from 'src/auth/account-activation.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @UseGuards(AccountActivationGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor(...filesInterceptorConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody(apiBodySchema)
  @Post()
  create(@UploadedFiles() images: Array<Express.Multer.File>, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(images, createPostDto);    
  }

  @ApiBearerAuth()
  @UseGuards(AccountActivationGuard)
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findUserPosts() {
    return this.postsService.findUserPosts();
  }

  @ApiBearerAuth()
  @UseGuards(AccountActivationGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor(...filesInterceptorConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody(apiBodySchema)
  @Patch(':id')
  update(@UploadedFiles() images: Array<Express.Multer.File>, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto, images);
  }

  @ApiBearerAuth()
  @UseGuards(AccountActivationGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('deactivate/:id')
  deactivate(@Param('id') id: string) {
    return this.postsService.deactivate(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AccountActivationGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }


  @Get()
  findAll(@Query() query){
    return this.postsService.findAll(query)
    
  }
}
