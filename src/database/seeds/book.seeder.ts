/**
 * @author: YouJie
 * @date: 2020-04-18 11:24:59
 */

import { Logger } from '@nestjs/common';
import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Book } from '../../models/book.entity';

export default class BookSeeder implements Seeder {
  async run(factory: Factory, connection: Connection) {
    // await factory(Book)().createMany(10);
    await connection
      .createQueryBuilder()
      .insert()
      .into(Book)
      .values([{ name: '默认账本' }])
      .execute();
    Logger.log('Book table init success', 'Seeder');
  }
}
