import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CartSchema } from './cart.schema';
import { ProductSchema } from '@/contexts/products/infraestructure/persistence/typeorm/schemas';
import { CartItemCustomizationSchema } from './cart-item-customization.schema';

@Entity('cart_items')
@Index('IDX_CART_ITEMS_CART', ['cart_id'])
@Index('IDX_CART_ITEMS_PRODUCT', ['product_id'])
@Index('IDX_CART_ITEMS_DELETED_AT', ['deleted_at'])
export class CartItemSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'base_price' })
  base_price: number;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @Column({ type: 'text', name: 'notes', nullable: true })
  notes: string | null;

  @Column({ type: 'int', name: 'cart_id' })
  cart_id: number;

  @Column({ type: 'int', name: 'product_id' })
  product_id: number;

  @ManyToOne(() => ProductSchema, (productSchema) => productSchema.cart_item_products)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product!: Awaited<ProductSchema>;

  @ManyToOne(() => CartSchema, (cartSchema) => cartSchema.cart_items)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart!: Awaited<CartSchema>;

  @OneToMany(
    () => CartItemCustomizationSchema,
    (cartItemCustomizationSchema) => cartItemCustomizationSchema.cart_item,
    { onDelete: 'CASCADE' },
  )
  cart_item_customizations: Awaited<CartItemCustomizationSchema[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
