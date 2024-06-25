import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseRepository } from 'src/utils/abstract.repository';
import { ApiPaginatedResponse } from 'src/utils/app.types';
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

  public async getAllPostsWithViewsAndLikesCountPaginated(
    page = 1,
    limit = 10,
    userId?: number,
  ): Promise<ApiPaginatedResponse<Post>> {
    const queryBuilder = this.getRepository()
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .addSelect(['user.name'])

      .loadRelationCountAndMap(
        'post.viewsCount',
        'post.postViews',
        'postViewsCount',
      )
      .loadRelationCountAndMap(
        'post.likesCount',
        'post.postLikes',
        'postLikesCount',
      )
      .loadRelationCountAndMap(
        'post.notLikedCount',
        'post.postNotLiked',
        'postNotLikedCount',
      );

    if (userId) {
      queryBuilder
        .leftJoin(
          'post.postLikes',
          'pl',
          'pl.postId = post.id AND pl.userId = :userId',
          { userId },
        )
        .leftJoin(
          'post.postNotLiked',
          'pln',
          'pln.postId = post.id AND pln.userId = :userId',
          { userId },
        )

        .addSelect(
          '(CASE WHEN pl.userId = :userId THEN 1 ELSE NULL END) AS post_likedByUser',
        )
        .addSelect(
          '(CASE WHEN pln.userId = :userId THEN 1 ELSE NULL END) AS post_dislikedByUser',
        );
    }

    const [result, total] = await queryBuilder
      .orderBy('post.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const lastPage = Math.ceil(total / limit);
    const from = (page - 1) * limit + 1;
    const isEmpty = result.length === 0;

    return {
      data: result,
      links: {
        first: `/api/post?page=1&limit=${limit}`,
        last: `/api/post?page=${lastPage}&limit=${limit}`,
        prev: isEmpty
          ? null
          : `/api/post?page=${page === 1 ? 1 : page - 1}&limit=${limit}`,
        next: isEmpty ? null : `/api/post?page=${page + 1}&limit=${limit}`,
      },
      meta: {
        total,
        current_page: page,
        from,
        last_page: lastPage,
      },
    };
  }
}
