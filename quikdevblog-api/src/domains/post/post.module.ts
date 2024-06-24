import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from 'src/storage/storage.module';

import { PostLike } from './post-like/post-like.entity';
import { PostLikeService } from './post-like/post-like.service';
import { PostNotLiked } from './post-not-liked/post-not-liked.entity';
import { PostNotLikedService } from './post-not-liked/post-not-liked.service';

import { PostEditHistory } from './post-edit-history/post-edit-history.entity';
import { PostEditHistoryService } from './post-edit-history/post-edit-history.service';
import { PostView } from './post-view/post-view.entity';
import { PostViewService } from './post-view/post-view.service';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      PostLike,
      PostNotLiked,
      PostView,
      PostEditHistory,
    ]),
    StorageModule,
  ],
  exports: [
    PostService,
    PostLikeService,
    PostNotLikedService,
    PostViewService,
    PostEditHistoryService,
  ],
  providers: [
    PostService,
    PostLikeService,
    PostNotLikedService,
    PostViewService,
    PostEditHistoryService,
  ],
})
export class PostModule {}
