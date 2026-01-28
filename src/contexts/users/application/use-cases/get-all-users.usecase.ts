import { Inject, Injectable } from '@nestjs/common';

import { UserRepository } from '../../domain';

import { User } from '../../domain/entities';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execue(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
