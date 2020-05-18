import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as publicIp from 'public-ip';
import { hashSync, compareSync } from 'bcryptjs';

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
   * 检测密码是否一致
   * @param { String } password - 加密前密码
   */
  async comparePassword(password: string) {
    return await compareSync(password, this.password);
  }

  /**
   * 获取公网IPv4
   */
  static async getPublicIPv4() {
    return await publicIp.v4();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名' })
  @Column()
  username: string;

  @ApiProperty({ description: '昵称' })
  @Column({ default: '' })
  nickname: string;

  @Column()
  password: string;

  @ApiProperty({ description: '手机号' })
  @Column()
  mobile: string;

  @ApiProperty({ description: '头像' })
  @Column({ default: '' })
  avatar: string;

  @ApiProperty({ description: '登录IP' })
  @Column({ name: 'login_ip', default: '' })
  loginIp: string;

  @ApiProperty({ description: '注册IP' })
  @Column({ name: 'register_ip', default: '' })
  registerIp: string;

  @ApiProperty({ description: '最后在线时间' })
  @Column({ name: 'latest_online_at', default: '' })
  latestOnlineAt: Date;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
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
