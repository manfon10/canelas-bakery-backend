import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderSchema } from './order.schema';

@Entity('order_deductions')
export class OrderDeductionSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'type', length: 20 })
  type: string;

  @Column({ type: 'int', name: 'amount' })
  amount: number;

  @Column({ type: 'int', name: 'order_id' })
  order_id: number;

  @ManyToOne(() => OrderSchema, (orderSchema) => orderSchema.order_deductions)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order!: Awaited<OrderSchema>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
