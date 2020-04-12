import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { hashSync } from 'bcryptjs';
import * as publicIp from 'public-ip';

@Entity({ name: 'users' })
export class User {
  /**
   * 加密密码
   * @param { String } password - 密码
   */
  static encryptPassword(password) {
    return hashSync(password, 10);
  }

  /**
   * 获取公网IPv4
   */
  static async getPublicIPv4() {
    return await publicIp.v4();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ description: '用户名' })
  username: string;

  // @Column({ select: false })
  @Column()
  @ApiProperty({ description: '密码' })
  password: string;

  @Column()
  @ApiProperty({ description: '手机号' })
  mobile: string;

  @Column({ name: 'login_ip' })
  loginIp: string;

  @Column({ name: 'register_ip' })
  registerIp: string;

  @Column({ name: 'latest_online_at' })
  latestOnlineAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /**
   * 插入数据前，对密码进行加密
   */
  @BeforeInsert()
  encrypt() {
    this.password = User.encryptPassword(this.password);
  }

  /**
   * 插入数据前，设置注册的公网ip
   */
  @BeforeInsert()
  async setRegisterIp() {
    this.registerIp = await User.getPublicIPv4();
  }
}
