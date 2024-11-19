import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'

import { User } from '@/domain/entities/user/User'
import { UserRepository } from '@/domain/repositories/user/UserRepository'

import { DrizzleService } from '../../drizzle.service'
import { users } from '../../schemas'

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(private drizzleService: DrizzleService) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    // Retorna null se não encontrar
    if (result.length === 0) {
      return null
    }

    return result[0] as User
  }

  async create({ name, email, password }: User): Promise<void> {
    await this.drizzleService.db.insert(users).values({ name, email, password })
  }
}
