import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderSchema } from './order.schema';
import { UserSchema } from '@/contexts/users/infraestructure/persistence/typeorm/schemas';

@Entity('order_ratings')
export class OrderRatingSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'comment' })
  comment: string;

  @Column({ type: 'int', name: 'rating' })
  rating: number;

  @Column({ type: 'int', name: 'order_id' })
  order_id: number;

  @Column({ type: 'int', name: 'user_id' })
  user_id: number;

  @OneToOne(() => OrderSchema, (orderSchema) => orderSchema.order_deductions)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order!: Awaited<OrderSchema>;

  @ManyToOne(() => UserSchema, (userSchema) => userSchema.order_ratings)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: Awaited<UserSchema>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
