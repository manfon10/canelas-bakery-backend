export interface UserPrimitives {
  names: string;
  email: string;
  phone?: string;
  last_names?: string;
  login_email_code?: string | null;
  expires_email_code?: Date | null;
  has_login_google?: boolean;
  email_verified?: boolean;
}

export class User {
  constructor(
    public readonly id: number,
    public readonly names: string,
    public readonly last_names: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly login_email_code: string,
    public readonly expires_email_code: Date,
    public readonly has_login_google: boolean,
    public readonly is_active: boolean,
    public readonly email_verified: boolean,
  ) {}

  static fromObject(object: { [key: string]: any }): User {
    const {
      id,
      names,
      last_names,
      email,
      phone,
      login_email_code,
      expires_email_code,
      has_login_google,
      is_active,
      email_verified,
    } = object;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new User(
      id,
      names,
      last_names,
      email,
      phone,
      login_email_code,
      expires_email_code,
      has_login_google,
      is_active,
      email_verified,
    );
  }

  codeLogin() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  isExpired(): boolean {
    return new Date() > new Date(this.expires_email_code);
  }

  isValid(): boolean {
    return !this.isExpired();
  }
}
