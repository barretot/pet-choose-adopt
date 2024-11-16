import { User } from '../entities/User'

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(question: User): Promise<User>
}
