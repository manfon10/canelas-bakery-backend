import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { User, UserRepository } from '@/contexts/users/domain';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,

    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET') as string,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies?.access_token;
        },
      ]),
    });
  }

  async validate(payload: any): Promise<User> {
    const { id } = payload;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException('El Token no es valido');
    }

    if (!user.is_active) {
      throw new UnauthorizedException(
        'El usuario esta inactivo, hablar con el administrador de la tienda para su desbloqueo',
      );
    }

    return user;
  }
}
