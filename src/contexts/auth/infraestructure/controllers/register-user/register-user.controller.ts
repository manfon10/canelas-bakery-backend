import { Body, Controller, Post } from '@nestjs/common';

import { RegisterUserUseCase } from '@/contexts/auth/application/register-user';

import { RegisterUserDto } from './register-user.dto';

@Controller('/auth')
export class RegisterUserController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('/register')
  async run(@Body() data: RegisterUserDto) {
    return await this.registerUser.execute(data);
  }
}
