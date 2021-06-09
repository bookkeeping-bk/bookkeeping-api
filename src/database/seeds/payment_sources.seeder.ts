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
    await connection
      .createQueryBuilder()
      .insert()
      .into(PaymentSources)
      .values([
        { name: '支付宝' },
        { name: '微信' },
        { name: '现金' },
        { name: '招商银行' },
        { name: '工商银行' },
        { name: '农业银行' },
        { name: '农村信用社' },
      ])
      .execute();
    Logger.log('Payment Sources table init success', 'Seeder');
  }
}
