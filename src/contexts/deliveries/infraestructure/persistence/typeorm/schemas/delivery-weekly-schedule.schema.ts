import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeliveryTimeSlotSchema } from './delivery-time-slot.model';

@Entity('delivery_weekly_schedule')
export class DeliveryWeeklyScheduleSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'weekday' })
  weekday: number;

  @Column({ type: 'int', name: 'max_order_per_day' })
  max_order_per_day: number;

  @Column({ type: 'boolean', name: 'enabled', default: true })
  enabled: boolean;

  @OneToMany(
    () => DeliveryTimeSlotSchema,
    (deliveryTimeSlotSchema) => deliveryTimeSlotSchema.delivery_weekly_schedule,
  )
  delivery_time_slots: Awaited<DeliveryTimeSlotSchema[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
