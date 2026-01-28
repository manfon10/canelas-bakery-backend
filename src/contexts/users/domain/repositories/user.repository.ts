import { User } from '../entities';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
}
