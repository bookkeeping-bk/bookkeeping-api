import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './config/ormconfig';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { BookModule } from './modules/book/book.module';
import { BillModule } from './modules/bill/bill.module';
import { BillCategoryModule } from './modules/bill-category/bill-category.module';
import { PaymentSourcesModule } from './modules/payment-sources/payment-sources.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UserModule,
    FileModule,
    BookModule,
    BillModule,
    BillCategoryModule,
    PaymentSourcesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
