import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../../domain';
import { UserSchema } from '../persistence/typeorm';
import { User } from '../../domain/entities';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repository: Repository<UserSchema>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users.map((user) => User.fromObject(user));
  }
}
