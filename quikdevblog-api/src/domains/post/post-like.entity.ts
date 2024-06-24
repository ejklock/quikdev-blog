import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from './post.entity';

@Entity('post_likes')
export class PostLike extends BaseEntity {
  @Column({ name: 'post_id' })
  postId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.postLikes)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @OneToOne(() => User)
  user: User;
}
