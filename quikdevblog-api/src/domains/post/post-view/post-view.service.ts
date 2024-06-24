import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/utils/abstract.repository';
import { Repository } from 'typeorm';
import { PostView } from './post-view.entity';

@Injectable()
export class PostViewService extends BaseRepository<PostView> {
  constructor(
    @InjectRepository(PostView)
    private readonly postViewRepository: Repository<PostView>,
  ) {
    super(postViewRepository);
  }

  async registerPostView(postId: number, userId: number) {
    try {
      await this.postViewRepository.upsert(
        [{ postId, userId, viewedAt: new Date() }],
        ['userId', 'postId', 'viewedAt'],
      );

      return true;
    } catch (error) {
      return false;
    }
  }
}
