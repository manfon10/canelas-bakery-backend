import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { type IEmailAdapter } from '@/contexts/shared/adapters/email';

import { UserRepository } from '@/contexts/users/domain';

@Injectable()
export class SendLoginCodeUseCase {
  constructor(
    @Inject('EmailAdapter')
    private readonly emailAdapter: IEmailAdapter,

    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (!emailExists) {
      throw new BadRequestException('El correo es invalido');
    }

    const expires = new Date(emailExists.expires_email_code);

    if (!isNaN(expires.getTime()) && expires > new Date()) {
      throw new BadRequestException('Tiene un codigo activo para ser validado');
    }

    const code = emailExists.codeLogin();

    await this.userRepository.update(emailExists.id, {
      login_email_code: code,
      expires_email_code: new Date(Date.now() + 10 * 60 * 1000),
    });

    await this.emailAdapter.sendVerificationCode(email, code);
  }
}
