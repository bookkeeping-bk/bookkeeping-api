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
    // await connection
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values([
    //     {
    //       username: 'admin',
    //       mobile: '18080488407',
    //       password: User.encryptPassword('123456'),
    //       registerIp: await User.getPublicIPv4(),
    //     },
    //   ])
    //   .execute();
    // Logger.log('用户表初始化完成', 'Seeder');
  }
}
