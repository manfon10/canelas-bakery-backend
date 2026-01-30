import { Module } from '@nestjs/common';

import { GmailAdapter } from '.';

@Module({
  exports: ['EmailAdapter'],
  providers: [{ provide: 'EmailAdapter', useClass: GmailAdapter }],
})
export class MailModule {}
