import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderSchema } from './order.schema';
import { OrderItemCustomizationSchema } from './order-item-customization.schema';

@Entity('order_items')
export class OrderItemSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'product_name', length: 150 })
  product_name: string;

  @Column({ type: 'int', name: 'base_price' })
  base_price: number;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @Column({ type: 'int', name: 'product_id' })
  product_id: number;

  @Column({ type: 'int', name: 'order_id' })
  order_id: number;

  @ManyToOne(() => OrderSchema, (orderSchema) => orderSchema.order_items)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order!: Awaited<OrderSchema>;

  @OneToMany(
    () => OrderItemCustomizationSchema,
    (orderItemCustomizationSchema) => orderItemCustomizationSchema.order_item,
  )
  order_item_customizations!: Awaited<OrderItemCustomizationSchema[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
