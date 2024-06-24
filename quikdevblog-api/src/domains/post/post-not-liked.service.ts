import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/utils/abstract.repository';
import { Repository } from 'typeorm';
import { PostNotLiked } from './post-not-liked.entity';

@Injectable()
export class PostNotLikedService extends BaseRepository<PostNotLiked> {
  constructor(
    @InjectRepository(PostNotLiked)
    private postNotLikedRepository: Repository<PostNotLiked>,
  ) {
    super(postNotLikedRepository);
  }

  async registerPostNotLiked(postId: number, userId: number) {
    try {
      await this.postNotLikedRepository.upsert(
        [{ postId, userId }],
        ['userId', 'postId'],
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async removePostNotLiked(postId: number, userId: number) {
    try {
      await this.postNotLikedRepository.delete({ postId, userId });
      return true;
    } catch (error) {
      return false;
    }
  }
}
