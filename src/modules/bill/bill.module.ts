/**
 * @author: YouJie
 * @date: 2020-04-30 16:33:17
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from '@/models/bill.entity';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { BillCategoryModule } from '../bill-category/bill-category.module';
import { PaymentSourcesModule } from '../payment-sources/payment-sources.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bill]),
    BillCategoryModule,
    PaymentSourcesModule,
    UserModule,
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
