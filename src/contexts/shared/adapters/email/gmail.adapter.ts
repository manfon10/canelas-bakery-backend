import { google } from 'googleapis';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEmailAdapter } from './email.adapter.interface';

@Injectable()
export class GmailAdapter implements IEmailAdapter {
  private gmail;

  constructor(private readonly configService: ConfigService) {
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
      this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
    );

    oauth2Client.setCredentials({
      refresh_token: this.configService.get<string>('GOOGLE_REFRESH_TOKEN'),
    });

    this.gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    const message = [
      `To: ${email}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: Envio de correo`,
      '',
      `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Tu código de verificación</h2>
          <p>Usa el siguiente código para iniciar sesión:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px;">
            ${code}
          </div>
          <p style="margin-top: 20px; color: #666;">Este código expirará en 10 minutos.</p>
          <p style="color: #999; font-size: 12px;">Si no solicitaste este código, puedes ignorar este correo.</p>
        </div>
      `,
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await this.gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
  }
}
