import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillCategory } from './bill_category.entity';
import { PaymentSources } from './payment_sources.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'bills' })
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '账单分类' })
  @OneToOne(() => BillCategory)
  @JoinColumn({ name: 'bill_type_id' })
  billCategory: BillCategory;

  @ApiProperty({ description: '支付来源' })
  @OneToOne(() => PaymentSources)
  @JoinColumn({ name: 'payment_source_id' })
  paymentSource: PaymentSources;

  @ApiProperty({ description: '记录用户' })
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ description: '记录时间' })
  @Column({ name: 'record_at' })
  recordAt: Date;

  @ApiProperty({ description: '账单金额' })
  @Column()
  money: number;

  @ApiProperty({ description: '账单图片' })
  @Column({ default: '' })
  images: string;

  @ApiProperty({ description: '备注' })
  @Column({ default: '' })
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
