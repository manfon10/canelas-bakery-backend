import { Body, Controller, Post } from '@nestjs/common';

import { SendLoginCodeUseCase } from '@/contexts/auth/application/send-login-code-usecase';

import { SendCodeLoginDto } from './send-login-code.dto';

@Controller('/auth')
export class SendLoginCodeController {
  constructor(private readonly sendLoginCode: SendLoginCodeUseCase) {}

  @Post('/send-code')
  async run(@Body() data: SendCodeLoginDto) {
    await this.sendLoginCode.execute(data.email);
  }
}
