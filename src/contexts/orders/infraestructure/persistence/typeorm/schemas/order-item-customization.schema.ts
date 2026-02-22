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

import { OrderItemSchema } from './order-item.schema';
import { OrderItemCustomizationOptionSchema } from './order-item-customization-option.schema';

@Entity('order_item_customizations')
export class OrderItemCustomizationSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'customization_category_name', length: 150 })
  customization_category_name: string;

  @Column({ type: 'int', name: 'order_item_id' })
  order_item_id: number;

  @ManyToOne(() => OrderItemSchema, (orderItemSchema) => orderItemSchema.order_item_customizations)
  @JoinColumn({ name: 'order_item_id', referencedColumnName: 'id' })
  order_item!: Awaited<OrderItemSchema>;

  @OneToMany(
    () => OrderItemCustomizationOptionSchema,
    (orderItemCustomizationOptionSchema) =>
      orderItemCustomizationOptionSchema.order_item_customization,
  )
  order_item_customization_options!: Awaited<OrderItemCustomizationOptionSchema[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
