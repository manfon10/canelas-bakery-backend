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

import { CartItemSchema } from './cart-item-schema';
import { CartItemCustomizationOptionSchema } from './cart-item-customization-option.schema';

@Entity('cart_item_customizations')
export class CartItemCustomizationSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'cart_item_id' })
  cart_item_id: number;

  @Column({ type: 'varchar', name: 'customization_category_name', length: 100 })
  customization_category_name: string;

  @ManyToOne(() => CartItemSchema, (cartItemSchema) => cartItemSchema.cart_item_customizations)
  @JoinColumn({ name: 'cart_item_id', referencedColumnName: 'id' })
  cart_item!: Awaited<CartItemSchema>;

  @OneToMany(
    () => CartItemCustomizationOptionSchema,
    (cartItemCustomizationOptionSchema) =>
      cartItemCustomizationOptionSchema.cart_item_customization,
    { onDelete: 'CASCADE' },
  )
  cart_item_customization_options: Awaited<CartItemCustomizationOptionSchema[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
