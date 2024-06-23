import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post_likes')
export class PostLikeEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ name: 'post_id' })
  postId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
