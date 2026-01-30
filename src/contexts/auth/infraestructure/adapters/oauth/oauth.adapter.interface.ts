export interface GoogleUserInfo {
  sub: string;
  email: string;
  names: string;
  given_name?: string;
  family_name?: string;
}

export interface IOAuthAdapter {
  verifyGoogleToken(token: string): Promise<GoogleUserInfo>;
}
