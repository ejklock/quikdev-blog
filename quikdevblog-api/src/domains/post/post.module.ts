import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from 'src/storage/storage.module';

import { PostLike } from './post-like.entity';
import { PostLikeService } from './post-like.service';
import { PostNotLiked } from './post-not-liked.entity';
import { PostNotLikedService } from './post-not-liked.service';
import { PostView } from './post-view.entity';
import { PostViewService } from './post-view.service';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostLike, PostNotLiked, PostView]),
    StorageModule,
  ],
  exports: [PostService, PostLikeService, PostNotLikedService, PostViewService],
  providers: [
    PostService,
    PostLikeService,
    PostNotLikedService,
    PostViewService,
  ],
})
export class PostModule {}
