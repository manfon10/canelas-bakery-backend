import { User, UserPrimitives } from '../entities';

export abstract class UserRepository {
  abstract create(data: UserPrimitives): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: number): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract update(data: Partial<UserPrimitives>): Promise<User>;
}
