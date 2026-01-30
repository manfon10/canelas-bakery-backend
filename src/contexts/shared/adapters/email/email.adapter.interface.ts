export interface IEmailAdapter {
  sendVerificationCode(email: string, code: string): Promise<void>;
}
