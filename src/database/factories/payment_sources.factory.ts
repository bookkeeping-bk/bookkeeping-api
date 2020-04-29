/**
 * @author: YouJie
 * @date: 2020-04-18 12:48:58
 */

import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { PaymentSources } from '../../models/payment_sources.entity';

define(PaymentSources, (faker: typeof Faker) => {
  const paymentSource = new PaymentSources();
  paymentSource.name = faker.name.title();
  return paymentSource;
});
