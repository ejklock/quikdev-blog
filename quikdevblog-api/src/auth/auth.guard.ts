import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/user/user.entity';

import { ConfigType } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import { IS_GUEST_ROUTE } from './decorators/guest.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(appConfig.KEY)
    private appCfg: ConfigType<typeof appConfig>,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isGuestRoute = this.reflector.getAllAndOverride<boolean>(
      IS_GUEST_ROUTE,
      [context.getHandler(), context.getClass()],
    );
    if (isGuestRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<User>(token, {
        secret: this.appCfg.jwtSecret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
