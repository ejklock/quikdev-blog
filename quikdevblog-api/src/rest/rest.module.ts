import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class RestModule {}
