import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from 'src/comment/comment.module';
import { PostModule } from 'src/post/post.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [JwtModule, AuthModule, PostModule, CommentModule],
  controllers: [AuthController],
  providers: [],
})
export class RestModule {}
