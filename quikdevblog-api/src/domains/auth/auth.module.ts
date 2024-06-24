import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import appConfig from 'src/config/app.config';

import { CommentModule } from '../comment/comment.module';
import { PostModule } from '../post/post.module';
import { UsersModule } from '../user/users.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { MatchConstraint } from './decorators/match.decorator';

@Module({
  imports: [
    UsersModule,
    PostModule,
    CommentModule,
    JwtModule.registerAsync({
      inject: [appConfig.KEY],
      useFactory: (appCfg: ConfigType<typeof appConfig>) => {
        return {
          global: true,
          secret: appCfg.jwtSecret,
          signOptions: {
            audience: 'quikdevblog-api',
            algorithm: 'HS256',
            issuer: 'quikdevblog',
            expiresIn: appCfg.jwtExpire,
          },
          verifyOptions: {
            maxAge: appCfg.jwtExpire,
            algorithms: ['HS256'],
            issuer: 'quikdevblog',
            audience: 'quikdevblog-api',
          },
        };
      },
    }),
  ],
  exports: [AuthService, JwtModule],
  providers: [
    String,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    MatchConstraint,
  ],
  controllers: [],
})
export class AuthModule {}
