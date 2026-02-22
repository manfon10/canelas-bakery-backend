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

import { OrderItemCustomizationSchema } from './order-item-customization.schema';

@Entity('order_item_customization_options')
export class OrderItemCustomizationOptionSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'option_name', length: 150 })
  option_name: string;

  @Column({ type: 'int', name: 'extra_price' })
  extra_price: number;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @Column({ type: 'int', name: 'order_item_customization_id' })
  order_item_customization_id: number;

  @ManyToOne(
    () => OrderItemCustomizationSchema,
    (orderItemCustomizationSchema) => orderItemCustomizationSchema.order_item_customization_options,
  )
  @JoinColumn({ name: 'order_item_customization_id', referencedColumnName: 'id' })
  order_item_customization!: Awaited<OrderItemCustomizationSchema>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
