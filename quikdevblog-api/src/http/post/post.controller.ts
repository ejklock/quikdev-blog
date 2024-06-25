import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { CheckOwnership } from 'src/domains/auth/decorators/check-ownership.decorator';

import { PostLikeService } from 'src/domains/post/post-like/post-like.service';
import { PostNotLikedService } from 'src/domains/post/post-not-liked/post-not-liked.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/domains/file-upload/file-upload.service';
import { PostViewService } from 'src/domains/post/post-view/post-view.service';
import { PostService } from 'src/domains/post/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('api/posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postLikeService: PostLikeService,
    private readonly postNotLikedService: PostNotLikedService,
    private readonly postViewService: PostViewService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async store(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Request()
    req,
    @Body() createPostDto: CreatePostDto,
  ) {
    try {
      const postImage = await this.fileUploadService.uploadFile(file);
      const { title, description } = createPostDto;
      return this.postService.store({
        userId: req.user.sub,
        title,
        description,
        image: postImage.path,
      });
    } catch (error) {
      return {
        success: false,
        errors: error,
      };
    }
  }

  @Get()
  findAll(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.postService.getAllPostsWithViewsAndLikesCountPaginated(
      page,
      limit,
      req.user?.sub,
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @CheckOwnership('Post')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      const postImage = await this.fileUploadService.uploadFile(file);
      const { title, description } = updatePostDto;
      return this.postService.update(id, {
        title,
        description,
        image: postImage.path,
      });
    } catch (error) {
      return {
        success: false,
        errors: error,
      };
    }
  }
  @CheckOwnership('Post')
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: number) {
    await this.postLikeService.removePostLikeIfExist(id, req.user.sub);
    await this.postNotLikedService.removePostNotLiked(id, req.user.sub);
    return this.postService.remove(id);
  }

  @Put(':id/like')
  async storePostLike(@Request() req, @Param('id') id: number) {
    await this.postNotLikedService.removePostNotLiked(id, req.user.sub);
    return await this.postLikeService.registerPostLike(id, req.user.sub);
  }

  @Put(':id/unlike')
  async storePostUnLike(@Request() req, @Param('id') id: number) {
    await this.postLikeService.removePostLikeIfExist(id, req.user.sub);
    return await this.postNotLikedService.registerPostNotLiked(
      id,
      req.user.sub,
    );
  }

  @Post(':id/view')
  async storePostView(@Request() req, @Param('id') id: number) {
    return await this.postViewService.registerPostView(id, req.user.sub);
  }
}
