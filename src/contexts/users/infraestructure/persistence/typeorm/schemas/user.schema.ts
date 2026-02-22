import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CartSchema } from '@/contexts/carts/infraestructure/typeorm/schemas';
import { OrderRatingSchema } from '@/contexts/orders/infraestructure/persistence/typeorm/schemas';
import { ProductRatingSchema } from '@/contexts/products/infraestructure/persistence/typeorm/schemas';
import { UserPetSchema } from './user-pet.schema ';
import { UserAddressSchema } from './user-address.schema ';

@Entity('users')
@Index('IDX_USERS_EMAIL', ['email'], { unique: true })
@Index('IDX_USERS_LOGIN_EMAIL_CODE', ['login_email_code'])
@Index('IDX_USERS_IS_ACTIVE', ['is_active'])
@Index('IDX_USERS_DELETED_AT', ['deleted_at'])
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'names' })
  names: string;

  @Column({ type: 'varchar', length: 100, name: 'last_names', nullable: true })
  last_names: string | null;

  @Column({ type: 'varchar', length: 60, name: 'email' })
  email: string;

  @Column({ type: 'boolean', name: 'email_verified', default: false })
  email_verified: boolean;

  @Column({ type: 'varchar', length: 11, name: 'phone', nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 6, name: 'login_email_code', nullable: true })
  login_email_code: string | null;

  @Column({ type: 'timestamp', name: 'expires_email_code', nullable: true })
  expires_email_code: Date | null;

  @Column({ type: 'boolean', name: 'has_login_google', default: false })
  has_login_google: boolean;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  is_active: boolean;

  @OneToMany(() => CartSchema, (cartSchema) => cartSchema.user)
  carts: Awaited<CartSchema[]>;

  @OneToMany(() => UserPetSchema, (userPetSchema) => userPetSchema.user, { onDelete: 'CASCADE' })
  pets: Awaited<UserPetSchema[]>;

  @OneToMany(() => UserAddressSchema, (userAddressSchema) => userAddressSchema.user, {
    onDelete: 'CASCADE',
  })
  addresses: Awaited<UserAddressSchema[]>;

  @OneToMany(() => OrderRatingSchema, (orderRatingSchema) => orderRatingSchema.user)
  order_ratings: Awaited<OrderRatingSchema[]>;

  @OneToMany(() => ProductRatingSchema, (productRatingSchema) => productRatingSchema.user)
  product_ratings: Awaited<ProductRatingSchema[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
