import { Body, Controller, Delete, Param, Post, Request } from '@nestjs/common';

import { CheckOwnership } from 'src/domains/auth/decorators/check-ownership.decorator';
import { PostLikeService } from 'src/domains/post/post-like.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';

@Controller('post-like')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  @Post()
  create(@Request() req, @Body() createPostLikeDto: CreatePostLikeDto) {
    return this.postLikeService.registerPostLike(
      createPostLikeDto.postId,
      req.user.sub,
    );
  }

  @CheckOwnership('Post')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postLikeService.remove(+id);
  }
}
