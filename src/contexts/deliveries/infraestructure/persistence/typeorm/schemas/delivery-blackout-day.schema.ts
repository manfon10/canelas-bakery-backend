import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('delivery_blackout_days')
export class DeliveryBlackoutDaySchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', name: 'date' })
  date: Date;

  @Column({ type: 'text', name: 'reason' })
  reason: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
