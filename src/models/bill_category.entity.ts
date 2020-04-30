/**
 * @author: YouJie
 * @date: 2020-04-18 11:40:56
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

@Entity({ name: 'bill_categorys' })
export class BillCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '账单分类名称' })
  @Column()
  name: string;

  @ApiProperty({ description: '账单分类类型（1:收入 2:支出）', default: 1 })
  @Column()
  type: number;

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
