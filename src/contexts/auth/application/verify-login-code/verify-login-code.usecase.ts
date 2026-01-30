import { BadRequestException, Inject, UnauthorizedException } from '@nestjs/common';

import { User, UserRepository } from '@/contexts/users/domain';

import { type IJwtAdapter } from '../../infraestructure/adapters';

import { VerifyLoginCodeDto } from './verify-login-code.dto';

export class VerifyLoginCodeUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,

    @Inject('JwtAdapter')
    private readonly jwtAdapter: IJwtAdapter,
  ) {}

  async execute(data: VerifyLoginCodeDto): Promise<{ access_token: string; user: User }> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('El correo es invalido');
    }

    if (user.isExpired()) {
      throw new UnauthorizedException('El código ha expirado o ya fue usado');
    }

    if (+user.login_email_code !== +data.code) {
      throw new BadRequestException('El código es invalido');
    }

    await this.userRepository.update({
      id: user.id,
      login_email_code: null,
      expires_email_code: null,
    });

    const payload = { id: user.id };

    const accessToken = this.jwtAdapter.sign(payload);

    return {
      access_token: accessToken,
      user,
    };
  }
}
