import { BaseEntity } from 'src/utils/base.entity';
import { Column } from 'typeorm';

export class PostEditHistory extends BaseEntity {
  @Column({ name: 'post_id' })
  postId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'edited_at' })
  editedAt: Date;
}
