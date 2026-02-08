import { Controller, Get } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';

import { GetAllUsersUseCase } from '@/contexts/users/application/get-all-users';
import { User } from '@/contexts/users/domain/entities';

@Controller('/users')
export class GetAllUsersController {
  constructor(private readonly getAllUsers: GetAllUsersUseCase) {}

  @Auth()
  @Get()
  async run(): Promise<User[]> {
    return await this.getAllUsers.execue();
  }
}
