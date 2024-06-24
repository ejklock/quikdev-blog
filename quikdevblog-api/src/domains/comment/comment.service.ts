import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/utils/abstract.repository';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
@Injectable()
export class CommentService extends BaseRepository<Comment> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {
    super(commentRepository);
  }
}
