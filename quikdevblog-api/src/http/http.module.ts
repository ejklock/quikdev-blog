import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { FileUploadModule } from 'src/domains/file-upload/file-upload.module';

import { AuthModule } from 'src/domains/auth/auth.module';
import { CommentModule } from 'src/domains/comment/comment.module';

import { EntityManagerMiddleware } from 'src/middlewares/entity-manager.middleware';

import { PostModule } from 'src/domains/post/post.module';
import { AuthController } from './auth/auth.controller';
import { FileUploadController } from './file-upload/file-upload.controller';
import { PostController } from './post/post.controller';

@Module({
  imports: [JwtModule, AuthModule, PostModule, CommentModule, FileUploadModule],
  controllers: [AuthController, FileUploadController, PostController],
  providers: [],
})
export class HttpModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EntityManagerMiddleware)
      .forRoutes(
        { path: '/api/posts/*', method: RequestMethod.PATCH },
        { path: '/api/posts/*', method: RequestMethod.DELETE },
      );
  }
}
