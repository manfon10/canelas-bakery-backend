import { google } from 'googleapis';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEmailAdapter } from './email.adapter.interface';
import { renderCodeLogin, renderRegisterUser } from './templates';

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

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const message = [
      `To: ${to}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      html,
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

  async sendRegisterUser(email: string, code: string): Promise<void> {
    const template = renderRegisterUser(code);

    await this.sendEmail(email, 'Confirma tu cuenta', template);
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    const template = renderCodeLogin(code);

    await this.sendEmail(email, 'Codigo de acceso', template);
  }
}
