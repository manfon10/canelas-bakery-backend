import { Body, Controller, Post } from '@nestjs/common';

import { VerifyLoginCodeUseCase } from '@/contexts/auth/application';

import { VerifyLoginCodeDto } from './verify-login-code.dto';

@Controller('/auth')
export class VerifiLoginCodeController {
  constructor(private readonly verifyLoginCode: VerifyLoginCodeUseCase) {}

  @Post('/verify-code')
  async run(@Body() data: VerifyLoginCodeDto) {
    return await this.verifyLoginCode.execute(data);
  }
}
