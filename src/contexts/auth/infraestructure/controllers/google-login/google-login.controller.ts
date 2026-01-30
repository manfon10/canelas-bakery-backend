import { Body, Controller, Post } from '@nestjs/common';

import { GoogleLoginUseCase } from '@/contexts/auth/application/google-login';

import { GoogleLoginDto } from './google-login.dto';

@Controller('/auth')
export class GoogleLoginController {
  constructor(private readonly googleLoginUseCase: GoogleLoginUseCase) {}

  @Post('/google')
  async run(@Body() data: GoogleLoginDto) {
    return await this.googleLoginUseCase.execute(data.token);
  }
}
