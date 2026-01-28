import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmDatabaseModule } from '@/contexts/shared/infraestructure/database/typeorm/typeorm.module';
import { UserModule } from '@/contexts/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),

    TypeOrmDatabaseModule,

    UserModule,
  ],
})
export class AppModule {}
