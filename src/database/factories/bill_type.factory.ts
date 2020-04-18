/**
 * @author: YouJie
 * @date: 2020-04-18 13:00:55
 */

import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { BillType } from '../../models/bill_type.entity';

define(BillType, (faker: typeof Faker) => {
  const billType = new BillType();
  billType.name = faker.name.title();
  billType.type = 1;
  return billType;
});
