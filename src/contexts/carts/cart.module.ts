import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CartItemCustomizationOptionSchema,
  CartItemCustomizationSchema,
  CartItemSchema,
  CartSchema,
} from './infraestructure/typeorm/schemas';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([
      CartSchema,
      CartItemSchema,
      CartItemCustomizationSchema,
      CartItemCustomizationOptionSchema,
    ]),
  ],
  providers: [],
})
export class CartModule {}
