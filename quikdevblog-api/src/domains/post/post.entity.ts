import { User } from 'src/domains/user/user.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { PostLike } from './post-like/post-like.entity';
import { PostNotLiked } from './post-not-liked/post-not-liked.entity';
import { PostView } from './post-view/post-view.entity';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'title' })
  title: string;

  @Column()
  description: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User)
  user: User;

  @OneToMany(() => PostView, (postView) => postView.post)
  postViews: PostView[];

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  postLikes: PostLike[];

  @OneToMany(() => PostNotLiked, (postNotLiked) => postNotLiked.post)
  postNotLiked: PostNotLiked[];
}
