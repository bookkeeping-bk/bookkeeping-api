import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'payment_sources' })
export class PaymentSources {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '账户名称' })
  @Column()
  name: string;

  @ApiProperty({ description: '备注' })
  @Column()
  remark: string;

  @ApiProperty({ description: '删除时间' })
  @DeleteDateColumn({ name: 'delete_at' })
  deleteAt: Date;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
