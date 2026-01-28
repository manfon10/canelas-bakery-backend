import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmUserRepository } from './infraestructure/repositories';
import { UserSchema } from './infraestructure/persistence/typeorm';
import { GetAllUsersController } from './infraestructure/http';
import { GetAllUsersUseCase } from './application/use-cases';

@Module({
  controllers: [GetAllUsersController],
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [
    GetAllUsersUseCase,
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: ['UserRepository', GetAllUsersUseCase],
})
export class UserModule {}
