/**
 * @author: YouJie
 * @date: 2020-04-29 16:00:29
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentSources } from '@/models/payment_sources.entity';
import { PaymentSourcesController } from './payment-sources.controller';
import { PaymentSourcesService } from './payment-sources.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentSources]), AuthModule],
  controllers: [PaymentSourcesController],
  providers: [PaymentSourcesService],
})
export class PaymentSourcesModule {}
