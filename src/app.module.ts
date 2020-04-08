import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormconfig from './database/ormconfig'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import TestModule from './modules/test.module';
// import RepoModule from './repo.module';
// import Test from './module/test.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    // RepoModule
    TestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
