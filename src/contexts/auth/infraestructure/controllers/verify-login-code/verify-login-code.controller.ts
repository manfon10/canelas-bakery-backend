import type { Response } from 'express';

import { Body, Controller, Post, Res } from '@nestjs/common';

import { VerifyLoginCodeUseCase } from '@/contexts/auth/application';

import { VerifyLoginCodeDto } from './verify-login-code.dto';

@Controller('/auth')
export class VerifiLoginCodeController {
  constructor(private readonly verifyLoginCode: VerifyLoginCodeUseCase) {}

  @Post('/verify-code')
  async run(@Body() data: VerifyLoginCodeDto, @Res({ passthrough: true }) res: Response) {
    const authData = await this.verifyLoginCode.execute(data);

    res.cookie('access_token', authData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 1,
      path: '/',
    });

    return authData;
  }
}
