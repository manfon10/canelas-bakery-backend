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

import { CartItemCustomizationSchema } from './cart-item-customization.schema';

@Entity('cart_item_customization_options')
export class CartItemCustomizationOptionSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'extra_price' })
  extra_price: number;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @Column({ type: 'varchar', name: 'option_name', length: 100 })
  option_name: string;

  @Column({ type: 'int', name: 'cart_item_customization_id' })
  cart_item_customization_id: number;

  @ManyToOne(
    () => CartItemCustomizationSchema,
    (cartItemCustomizationSchema) => cartItemCustomizationSchema.cart_item_customization_options,
  )
  @JoinColumn({ name: 'cart_item_customization_id', referencedColumnName: 'id' })
  cart_item_customization!: Awaited<CartItemCustomizationSchema>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
