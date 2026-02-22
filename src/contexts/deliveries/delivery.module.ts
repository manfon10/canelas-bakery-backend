import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  DeliveryBlackoutDaySchema,
  DeliveryTimeSlotSchema,
  DeliveryWeeklyScheduleSchema,
} from './infraestructure';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([
      DeliveryBlackoutDaySchema,
      DeliveryTimeSlotSchema,
      DeliveryWeeklyScheduleSchema,
    ]),
  ],
  providers: [],
  exports: [],
})
export class DeliveryModule {}
