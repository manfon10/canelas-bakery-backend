export interface IJwtAdapter {
  sign(payload: any): string;
}
