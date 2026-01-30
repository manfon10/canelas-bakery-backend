import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IJwtAdapter } from './jwt.adapter.interface';

@Injectable()
export class JwtAdapter implements IJwtAdapter {
  constructor(private readonly jwtService: JwtService) {}

  sign(id: number) {
    return this.jwtService.sign({ id });
  }
}
