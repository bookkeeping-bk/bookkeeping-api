/**
 * @author: YouJie
 * @date: 2020-06-10 15:17:42
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Bill } from '@/models/bill.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bill]), AuthModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
