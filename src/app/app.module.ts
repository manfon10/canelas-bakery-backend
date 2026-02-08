import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmDatabaseModule } from '@/contexts/shared/database/typeorm/typeorm.module';

import { UserModule } from '@/contexts/users/user.module';
import { AuthModule } from '@/contexts/auth/auth.module';
import { ProductModule } from '@/contexts/products/product.module';

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
  ],
})
export class AppModule {}
