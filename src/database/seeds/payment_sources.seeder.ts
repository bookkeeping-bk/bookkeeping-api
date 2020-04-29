/**
 * @author: YouJie
 * @date: 2020-04-18 12:48:06
 */

import { Logger } from '@nestjs/common';
import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PaymentSources } from '../../models/payment_sources.entity';

export default class BillTypeSeeder implements Seeder {
  async run(factory: Factory, connection: Connection) {
    await factory(PaymentSources)().createMany(10);
    Logger.log('支付来源表初始化完成', 'Seeder');
  }
}
