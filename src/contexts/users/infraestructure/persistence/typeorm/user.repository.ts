import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../../../domain';
import { User, UserPrimitives } from '../../../domain/entities';

import { UserSchema } from '../schemas';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repository: Repository<UserSchema>,
  ) {}

  async create(data: UserPrimitives): Promise<User> {
    const userSaved = await this.repository.save(data);

    const user = await this.findById(userSaved.id!);

    return user!;
  }

  async findAll(): Promise<User[]> {
    const users = await this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.names',
        'user.last_names',
        'user.phone',
        'user.is_active',
      ])
      .getMany();

    return users.map(User.fromObject);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.names',
        'user.last_names',
        'user.phone',
        'user.login_email_code',
        'user.has_login_google',
        'user.expires_email_code',
      ])
      .where('user.email = :email', { email })
      .getOne();

    return user ? User.fromObject(user) : null;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.names',
        'user.last_names',
        'user.phone',
        'user.login_email_code',
        'user.has_login_google',
        'user.expires_email_code',
      ])
      .where('user.email = :id', { id })
      .getOne();

    return user ? User.fromObject(user) : null;
  }

  async update(data: User): Promise<User> {
    await this.repository.update(data.id, data);

    const userUpdated = await this.findById(data.id!);

    return userUpdated!;
  }
}
