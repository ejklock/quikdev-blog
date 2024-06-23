import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post_views')
export class PostViewEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ name: 'post_id' })
  postId: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'viewed_at' })
  viewedAt: Date;
}
