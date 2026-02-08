import { OAuth2Client } from 'google-auth-library';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GoogleUserInfo, IOAuthAdapter } from './oauth.adapter.interface';

@Injectable()
export class GoogleOAuthAdapter implements IOAuthAdapter {
  private client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new OAuth2Client(this.configService.get<string>('GOOGLE_CLIENT_ID'));
  }

  async verifyGoogleToken(token: string): Promise<GoogleUserInfo> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new InternalServerErrorException('Token inválido');
      }

      return {
        email: payload.email!,
        names: payload.name!,
        sub: payload.sub!,
        family_name: payload.family_name,
        given_name: payload.family_name,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al verificar token de Google: ${error.message}`,
      );
    }
  }
}
