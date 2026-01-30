import { Inject } from '@nestjs/common';

import { User, UserRepository } from '@/contexts/users/domain';

import type { IJwtAdapter, IOAuthAdapter } from '../../infraestructure/adapters';

export class GoogleLoginUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,

    @Inject('AuthAdapter')
    private readonly oauthAdapter: IOAuthAdapter,

    @Inject('JwtAdapter')
    private readonly jwtAdapter: IJwtAdapter,
  ) {}

  async execute(token: string): Promise<{ access_token: string; user: User }> {
    const googleUser = await this.oauthAdapter.verifyGoogleToken(token);

    let user = await this.userRepository.findByEmail(googleUser.email);

    if (!user) {
      user = await this.userRepository.create({
        email: googleUser.email,
        last_names: `${googleUser.family_name} ${googleUser.given_name}`,
        names: googleUser.names,
        has_login_google: true,
      });
    }

    const payload = { id: user.id };

    const accessToken = this.jwtAdapter.sign(payload);

    return {
      access_token: accessToken,
      user,
    };
  }
}
