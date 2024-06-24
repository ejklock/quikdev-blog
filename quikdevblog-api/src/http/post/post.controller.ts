import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';

import { CheckOwnership } from 'src/domains/auth/decorators/check-ownership.decorator';

import { PostLikeService } from 'src/domains/post/post-like/post-like.service';
import { PostNotLikedService } from 'src/domains/post/post-not-liked/post-not-liked.service';

import { PostViewService } from 'src/domains/post/post-view/post-view.service';
import { PostService } from 'src/domains/post/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postLikeService: PostLikeService,
    private readonly postNotLikedService: PostNotLikedService,
    private readonly postViewService: PostViewService,
  ) {}

  @Post()
  store(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postService.store({
      userId: req.user.sub,
      ...createPostDto,
    });
  }

  @Get()
  findAll() {
    return this.postService.getAllPostsWithViewsAndLikesCount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @CheckOwnership('Post')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, {
      image: updatePostDto.image,
      title: updatePostDto.title,
      description: updatePostDto.description,
    });
  }
  @CheckOwnership('Post')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @Post(':id/like')
  async storePostLike(@Request() req, @Param('id') id: number) {
    await this.postNotLikedService.removePostNotLiked(id, req.user.sub);
    return await this.postLikeService.registerPostLike(id, req.user.sub);
  }

  @Post(':id/unlike')
  async storePostUnLike(@Request() req, @Param('id') id: number) {
    await this.postLikeService.removePostLike(id, req.user.sub);
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
