import { Injectable } from '@nestjs/common'

import { User } from '@/domain/entities/user/User'
import { UserRepository } from '@/domain/repositories/user/UserRepository'

import { InMemoryDatabaseService } from './in-memory-database.service'

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  constructor(private db: InMemoryDatabaseService<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = this.db.find((user) => user.email === email)
    return user || null
  }

  async create({ name, email, password }: User): Promise<void> {
    await this.db.create({ name, email, password })
  }
}
