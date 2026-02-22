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
import { DeliveryWeeklyScheduleSchema } from './delivery-weekly-schedule.schema';
import { OrderSchema } from '@/contexts/orders/infraestructure/persistence';

@Entity('delivery_time_slots')
export class DeliveryTimeSlotSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time', name: 'start_time' })
  start_time: string;

  @Column({ type: 'time', name: 'end_time' })
  end_time: string;

  @Column({ type: 'int', name: 'max_orders' })
  max_orders: number;

  @Column({ type: 'boolean', name: 'enabled', default: true })
  enabled: boolean;

  @Column({ type: 'int', name: 'weekly_schedule_id' })
  weekly_schedule_id: number;

  @ManyToOne(
    () => DeliveryWeeklyScheduleSchema,
    (deliveryWeeklyScheduleSchema) => deliveryWeeklyScheduleSchema.delivery_time_slots,
  )
  @JoinColumn({ name: 'weekly_schedule_id', referencedColumnName: 'id' })
  delivery_weekly_schedule!: Awaited<DeliveryWeeklyScheduleSchema>;

  @OneToOne(() => OrderSchema, (orderSchema) => orderSchema.delivery_time_slot)
  order: Awaited<OrderSchema>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
