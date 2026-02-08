export interface IEmailAdapter {
  sendEmail(to: string, subject: string, html: string): Promise<void>;
  sendVerificationCode(email: string, code: string): Promise<void>;
  sendRegisterUser(email: string, code: string): Promise<void>;
}
