import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  OrderDeductionSchema,
  OrderItemCustomizationOptionSchema,
  OrderItemCustomizationSchema,
  OrderItemSchema,
  OrderRatingSchema,
  OrderSchema,
} from './infraestructure/persistence';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([
      OrderSchema,
      OrderItemSchema,
      OrderItemCustomizationSchema,
      OrderItemCustomizationOptionSchema,
      OrderDeductionSchema,
      OrderRatingSchema,
    ]),
  ],
  providers: [],
  exports: [],
})
export class OrderModule {}
