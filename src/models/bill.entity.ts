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
import { BillType } from './bill_type.entity';
import { PaymentSource } from './payment_source.entity';
import { User } from './user.entity';

@Entity({ name: 'bills' })
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => BillType)
  @JoinColumn({ name: 'bill_type_id' })
  billType: BillType;

  @OneToOne(() => PaymentSource)
  @JoinColumn({ name: 'payment_source_id' })
  paymentSource: PaymentSource;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  money: number;

  @Column()
  recordAt: Date;

  @Column()
  images: string;

  @Column()
  remark: string;

  @DeleteDateColumn({ name: 'delete_at' })
  deleteAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
