/**
 * @author: YouJie
 * @date: 2020-04-30 16:33:17
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from '@/models/bill.entity';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
