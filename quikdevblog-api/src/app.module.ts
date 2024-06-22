import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import dbMysqlConfig from './config/db-mysql.config';
import { MySqlDBConfigService } from './config/services/MySqlDBConfigService';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbMysqlConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: MySqlDBConfigService,
      inject: [MySqlDBConfigService],
    }),
    RestModule,
  ],
})
export class AppModule {}
