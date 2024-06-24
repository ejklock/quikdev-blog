import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from './post.entity';

@Entity('post_views')
export class PostView extends BaseEntity {
  @Column({ name: 'post_id' })
  postId: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'viewed_at' })
  viewedAt: Date;

  @ManyToOne(() => Post, (post) => post.postViews)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
