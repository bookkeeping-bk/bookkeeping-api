/**
 * @author: YouJie
 * @date: 2020-04-18 13:00:55
 */

import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { BillCategory } from '../../models/bill_category.entity';

define(BillCategory, (faker: typeof Faker) => {
  const billCategory = new BillCategory();
  billCategory.name = faker.name.title();
  billCategory.type = 1;
  return billCategory;
});
