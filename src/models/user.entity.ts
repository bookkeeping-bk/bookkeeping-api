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

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  mobile: string;

  @Column()
  avatar: string;

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
