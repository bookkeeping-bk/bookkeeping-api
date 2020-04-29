/**
 * @author: YouJie
 * @date: 2020-04-25 20:25:21
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillCategory } from '@/models/bill_category.entity';
import { BillCategoryService } from './bill-category.service';
import { BillCategoryController } from './bill-category.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BillCategory]), AuthModule],
  controllers: [BillCategoryController],
  providers: [BillCategoryService],
})
export class BillCategoryModule {}
