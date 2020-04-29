import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './config/ormconfig';

import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { BillCategoryModule } from './modules/bill-category/bill-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    BookModule,
    BillCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
