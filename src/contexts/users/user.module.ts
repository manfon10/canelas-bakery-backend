import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GetAllUsersController } from './infraestructure/controllers';

import { GetAllUsersUseCase } from './application';

import { UserSchema } from './infraestructure/persistence/typeorm/schemas';
import { TypeOrmUserRepository } from './infraestructure/persistence/typeorm/repositories';

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
