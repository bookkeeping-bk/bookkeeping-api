/**
 * @author: YouJie
 * @date: 2020-04-18 11:17:15
 */

import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '账本名称' })
  @Column()
  name: string;

  @ApiProperty({ description: '删除时间', default: '' })
  @DeleteDateColumn({ name: 'delete_at' })
  deleteAt: Date;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
