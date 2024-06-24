import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/utils/abstract.repository';
import { Repository } from 'typeorm';
import { PostEditHistory } from './post-edit-history.entity';

@Injectable()
export class PostEditHistoryService extends BaseRepository<PostEditHistory> {
  constructor(
    @InjectRepository(PostEditHistory)
    private postEditHistoryRepository: Repository<PostEditHistory>,
  ) {
    super(postEditHistoryRepository);
  }
}
