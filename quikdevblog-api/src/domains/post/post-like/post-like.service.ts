import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/utils/abstract.repository';
import { Repository } from 'typeorm';
import { PostLike } from './post-like.entity';

@Injectable()
export class PostLikeService extends BaseRepository<PostLike> {
  constructor(
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,
  ) {
    super(postLikeRepository);
  }

  async registerPostLike(postId: number, userId: number) {
    try {
      await this.postLikeRepository.upsert(
        [{ postId, userId }],
        ['userId', 'postId'],
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async removePostLikeIfExist(postId: number, userId: number) {
    try {
      await this.postLikeRepository.delete({ postId, userId });
      return true;
    } catch (error) {
      return false;
    }
  }
}
