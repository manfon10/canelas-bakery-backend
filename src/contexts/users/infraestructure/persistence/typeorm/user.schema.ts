import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserSchema {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'names' })
  names: string;

  @Column({ type: 'varchar', length: 100, name: 'last_names' })
  last_names: string;

  @Column({ type: 'varchar', length: 60, name: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string;

  @Column({ type: 'varchar', length: 11, name: 'phone' })
  phone: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
