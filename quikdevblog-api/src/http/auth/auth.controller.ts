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

import { AuthGuard } from 'src/domains/auth/auth.guard';
import { AuthService } from 'src/domains/auth/auth.service';
import { Token } from 'src/domains/auth/auth.types';
import { Guest } from 'src/domains/auth/decorators/guest.decorator';
import { ApiResponse, AuthToken } from 'src/utils/app.types';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Guest()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<Token>> {
    try {
      const token = await this.authService.login(
        loginDto.email,
        loginDto.password,
      );

      return {
        success: true,
        data: token,
      };
    } catch (error) {
      return {
        success: false,
        errors: error,
      };
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Guest()
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ApiResponse<AuthToken>> {
    try {
      const token = await this.authService.register(
        registerDto.name,
        registerDto.email,
        registerDto.password,
      );
      return {
        success: true,
        data: token,
      };
    } catch (error) {
      return {
        success: false,
        errors: error,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
