import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ description: '用户名' })
  username: string;

  @Column()
  @ApiProperty({ description: '密码' })
  password: string;

  @Column()
  @ApiProperty({ description: '手机号' })
  mobile: string;

  @Column({ name: 'latest_online_at' })
  latestOnlineAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
