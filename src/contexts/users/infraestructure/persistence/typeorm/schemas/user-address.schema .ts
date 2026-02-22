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

import { UserSchema } from './user.schema';

@Entity('user_addresses')
export class UserAddressSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80, name: 'address_line' })
  address_line: string;

  @Column({ type: 'varchar', name: 'city' })
  city: string;

  @Column({ type: 'boolean', name: 'is_default', default: true })
  is_default: boolean;

  @Column({ type: 'int', name: 'user_id' })
  user_id: number;

  @ManyToOne(() => UserSchema)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: Awaited<UserSchema>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
