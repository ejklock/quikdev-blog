import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import appConfig from 'src/config/app.config';
import { User } from 'src/domains/user/user.entity';

import { UsersService } from 'src/domains/user/users.service';
import { Token } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(appConfig.KEY)
    private appCfg: ConfigType<typeof appConfig>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async encryptPassword(plainTextPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(plainTextPassword, salt);
  }

  private async checkPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private async generateJWT(user: User): Promise<string> {
    return this.jwtService.signAsync({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async register(
    name: string,
    email: string,
    plainTextPassword: string,
  ): Promise<Token> {
    const password = await this.encryptPassword(plainTextPassword);
    const user = await this.usersService.store({
      name,
      email,
      password,
    });

    if (!user) {
      throw new InternalServerErrorException('Error while creating user');
    }

    return {
      type: 'bearer',
      access_token: await this.generateJWT(user),
    };
  }
  async login(email: string, pass: string): Promise<Token> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await this.checkPassword(pass, user.password))) {
      throw new UnauthorizedException();
    }

    return {
      type: 'bearer',
      access_token: await this.generateJWT(user),
    };
  }
}
