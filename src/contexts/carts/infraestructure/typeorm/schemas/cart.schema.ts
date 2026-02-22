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

import { UserSchema } from '@/contexts/users/infraestructure/persistence/typeorm/schemas';
import { CartItemSchema } from './cart-item-schema';

@Entity('carts')
@Index('IDX_CARTS_USER', ['user_id'], { unique: true })
@Index('IDX_CARTS_STATUS', ['status'])
@Index('IDX_CARTS_DELETED_AT', ['deleted_at'])
export class CartSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'status' })
  status: string;

  @Column({ type: 'int', name: 'user_id' })
  user_id: number;

  @ManyToOne(() => UserSchema, (userSchema) => userSchema.carts, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: Awaited<UserSchema>;

  @OneToMany(() => CartItemSchema, (cartItemSchema) => cartItemSchema.cart, { onDelete: 'CASCADE' })
  cart_items: Awaited<CartItemSchema[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
