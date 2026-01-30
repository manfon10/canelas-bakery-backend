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

    await this.emailAdapter.sendVerificationCode(email, '123456');
  }
}
