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

import { UserSchema } from '@/contexts/users/infraestructure/persistence/typeorm/schemas';

import { ProductSchema } from './product.schema';

@Entity('product_ratings')
export class ProductRatingSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'comments' })
  comments: string;

  @Column({ type: 'int', name: 'rating' })
  rating: number;

  @Column({ type: 'int', name: 'product_id' })
  product_id: number;

  @Column({ type: 'int', name: 'user_id' })
  user_id: number;

  @Column({ type: 'int', name: 'order_item_id' })
  order_item_id: number;

  @ManyToOne(() => UserSchema, (userSchema) => userSchema.product_ratings)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: Awaited<UserSchema>;

  @ManyToOne(() => ProductSchema, (productSchema) => productSchema.product_ratings)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product!: Awaited<ProductSchema>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
