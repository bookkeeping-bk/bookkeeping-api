/**
 * @author: YouJie
 * @date: 2020-04-18 12:48:58
 */

import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { PaymentSource } from '../../models/payment_source.entity';

define(PaymentSource, (faker: typeof Faker) => {
  const paymentSource = new PaymentSource();
  paymentSource.name = faker.name.title();
  return paymentSource;
});
