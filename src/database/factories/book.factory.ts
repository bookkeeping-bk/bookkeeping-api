/**
 * @author: YouJie
 * @date: 2020-04-18 11:26:49
 */

import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Book } from '../../models/book.entity';

define(Book, (faker: typeof Faker) => {
  const book = new Book();
  book.name = faker.name.title();
  return book;
});
