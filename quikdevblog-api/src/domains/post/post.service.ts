import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseRepository } from 'src/utils/abstract.repository';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService extends BaseRepository<Post> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
    super(postRepository);
  }
  public getRepository(): Repository<Post> {
    return super.getRepository();
  }

  public async getAllPostsWithViewsAndLikesCount() {
    const posts = await this.getRepository()
      .createQueryBuilder('post')
      .loadRelationCountAndMap(
        'views.viewsCount',
        'post.postViews',
        'postViewsCount',
      )
      .loadRelationCountAndMap(
        'likes.likesCount',
        'post.postLikes',
        'postLikesCount',
      )
      .loadRelationCountAndMap(
        'notLikes.notLikedCount',
        'post.postNotLiked',
        'postNotLikedCount',
      )
      .orderBy('post.id', 'DESC')
      .getMany();
    return posts;
  }
}
