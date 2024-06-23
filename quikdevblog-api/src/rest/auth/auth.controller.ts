import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Token } from 'src/auth/auth.types';
import { Guest } from 'src/auth/decorators/guest.decorator';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Guest()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Token> {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Guest()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<Token> {
    return await this.authService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
