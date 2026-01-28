import { Controller, Get } from '@nestjs/common';
import { GetAllUsersUseCase } from '@/contexts/users/application/use-cases';
import { User } from '@/contexts/users/domain/entities';

@Controller('/users')
export class GetAllUsersController {
  constructor(private readonly getAllUsers: GetAllUsersUseCase) {}

  @Get()
  async run(): Promise<User[]> {
    return await this.getAllUsers.execue();
  }
}
