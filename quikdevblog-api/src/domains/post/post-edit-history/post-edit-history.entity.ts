import { User } from 'src/domains/user/user.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Post } from '../post.entity';

export class PostEditHistory extends BaseEntity {
  @Column({ name: 'post_id' })
  postId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'edited_at' })
  editedAt: Date;

  @ManyToOne(() => Post, (post) => post.postLikes)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @OneToOne(() => User)
  user: User;
}
