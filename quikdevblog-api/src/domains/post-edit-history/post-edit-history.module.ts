import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEditHistory } from './post-edit-history.entity';
import { PostEditHistoryService } from './post-edit-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEditHistory])],
  exports: [PostEditHistoryService],
  providers: [PostEditHistoryService],
})
export class PostEditHistoryModule {}
