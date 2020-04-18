/**
 * @author: YouJie
 * @date: 2020-04-18 13:17:53
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'wechat_users' })
export class WechatUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  openid: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @DeleteDateColumn({ name: 'delete_at' })
  deleteAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
