import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DeliveryTimeSlotSchema } from '@/contexts/deliveries/infraestructure';
import { OrderItemSchema } from './order-item.schema';
import { OrderDeductionSchema } from './order-deduction.schema';

@Entity('orders')
export class OrderSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'subtotal' })
  subtotal: number;

  @Column({ type: 'int', name: 'total_price' })
  total_price: number;

  @Column({ type: 'int', name: 'sale_price' })
  sale_price: number;

  @Column({ type: 'varchar', name: 'status', length: 40 })
  status: string;

  @Column({ type: 'int', name: 'profit' })
  profit: number;

  @Column({ type: 'int', name: 'payment_method_id' })
  payment_method_id: number;

  @Column({ type: 'int', name: 'user_id' })
  user_id: number;

  @Column({ type: 'int', name: 'delivery_time_slot_id' })
  delivery_time_slot_id: number;

  @OneToOne(() => DeliveryTimeSlotSchema, (deliveryTimeSlotSchema) => deliveryTimeSlotSchema.order)
  @JoinColumn({ name: 'delivery_time_slot_id', referencedColumnName: 'id' })
  delivery_time_slot!: Awaited<DeliveryTimeSlotSchema>;

  @OneToMany(() => OrderItemSchema, (orderItemSchema) => orderItemSchema.order)
  order_items: Awaited<OrderItemSchema[]>;

  @OneToMany(() => OrderDeductionSchema, (orderDeductionSchema) => orderDeductionSchema.order)
  order_deductions: Awaited<OrderDeductionSchema[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
