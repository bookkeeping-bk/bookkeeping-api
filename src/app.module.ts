import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './config/ormconfig';

import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
