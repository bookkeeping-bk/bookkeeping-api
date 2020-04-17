import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../models/user.entity';
import { Logger } from '@nestjs/common';

export default class UserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // await factory(User)().createMany(10);
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'admin',
          password: User.encryptPassword('123456'),
          mobile: '18080488407',
          registerIp: await User.getPublicIPv4(),
        },
      ])
      .execute();
    Logger.log('用户初始化完成', 'Seeder');
  }
}
