import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmDatabaseModule } from '@/contexts/shared/database/typeorm/typeorm.module';

import { UserModule } from '@/contexts/users/user.module';
import { AuthModule } from '@/contexts/auth/auth.module';
import { ProductModule } from '@/contexts/products/product.module';
import { CartModule } from '@/contexts/carts/cart.module';
import { DeliveryModule } from '@/contexts/deliveries/delivery.module';
import { OrderModule } from '@/contexts/orders/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),

    TypeOrmDatabaseModule,

    AuthModule,
    UserModule,
    ProductModule,
    CartModule,
    DeliveryModule,
    OrderModule,
  ],
})
export class AppModule {}
