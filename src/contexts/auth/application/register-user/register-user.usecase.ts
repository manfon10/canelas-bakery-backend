import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { type IEmailAdapter } from '@/contexts/shared/adapters/email';

import { UserRepository } from '@/contexts/users/domain';

import { RegisterUserDto } from './register-user.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('EmailAdapter')
    private readonly emailAdapter: IEmailAdapter,

    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(data: RegisterUserDto) {
    const { email, last_names, names, phone } = data;

    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new BadRequestException('El correo electronico ya existe en nuestro sistema');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.userRepository.create({
      email,
      last_names,
      names,
      phone,
      login_email_code: code,
      expires_email_code: new Date(Date.now() + 10 * 60 * 1000),
    });

    await this.emailAdapter.sendRegisterUser(email, code);
  }
}
