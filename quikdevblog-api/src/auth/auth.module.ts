import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import appConfig from 'src/config/app.config';
import { UsersModule } from '../user/users.module';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
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
            expiresIn: '1h',
          },
          verifyOptions: {
            maxAge: '1h',
            algorithms: ['HS256'],
            issuer: 'quikdevblog',
            audience: 'quikdevblog-api',
          },
        };
      },
    }),
  ],
  exports: [AuthService],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [],
})
export class AuthModule {}
