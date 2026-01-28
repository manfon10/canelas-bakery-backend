export interface UserPrimitives {
  id: number;
  names: string;
  last_names: string;
  email: string;
  password: string;
  phone: string;
  is_active: boolean;
}

export class User {
  constructor(
    public id: number,
    public names: string,
    public last_names: string,
    public email: string,
    public password: string,
    public phone: string,
    public is_active: boolean,
  ) {}

  static fromObject(object: { [key: string]: any }): User {
    const { id, names, last_names, email, password, phone, is_active } = object;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new User(id, names, last_names, email, password, phone, is_active);
  }
}
