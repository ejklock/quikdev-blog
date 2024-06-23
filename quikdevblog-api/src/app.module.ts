import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import dbMysqlConfig from './config/db-mysql.config';
import { MySqlDBConfigService } from './config/services/MySqlDBConfigService';
import { PostViewService } from './post-view/post-view.service';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbMysqlConfig, appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: MySqlDBConfigService,
      inject: [MySqlDBConfigService],
    }),
    RestModule,
  ],
  providers: [PostViewService],
})
export class AppModule {}
