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

@Entity('user_pets')
export class UserPetSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, name: 'name' })
  name: string;

  @Column({ type: 'date', name: 'birth_date', nullable: true })
  birth_date: Date | null;

  @Column({ type: 'varchar', length: 60, name: 'breed' })
  breed: string;

  @Column({ type: 'text', name: 'notes', nullable: true })
  notes: string | null;

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
