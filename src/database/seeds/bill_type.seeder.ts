/**
 * @author: YouJie
 * @date: 2020-04-18 12:39:28
 */

import { Logger } from '@nestjs/common';
import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { BillType } from '../../models/bill_type.entity';

export default class BillTypeSeeder implements Seeder {
  async run(factory: Factory, connection: Connection) {
    await factory(BillType)().createMany(10);
    Logger.log('账单类型表初始化完成', 'Seeder');
  }
}
