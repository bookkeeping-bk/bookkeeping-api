/**
 * @author: YouJie
 * @date: 2020-04-18 11:16:51
 */

import { Logger } from '@nestjs/common';
import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../models/user.entity';

export default class UserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'admin',
          mobile: '18080488407',
          password: User.encryptPassword('123456'),
          registerIp: await User.getPublicIPv4(),
        },
        {
          username: 'wyf',
          mobile: '15244830486',
          password: User.encryptPassword('123456'),
          registerIp: await User.getPublicIPv4(),
        },
        {
          username: 'fjg',
          mobile: '13540960924',
          password: User.encryptPassword('123456'),
          registerIp: await User.getPublicIPv4(),
        },
      ])
      .execute();
    Logger.log('Users table init success', 'Seeder');
  }
}
