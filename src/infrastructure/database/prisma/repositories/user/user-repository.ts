import { Injectable } from '@nestjs/common'

import { User } from '@/core/domain/entities/user/User'
import { UserRepository } from '@/core/domain/repositories/user/UserRepository'
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private db: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = this.db.user.findUnique({
      where: {
        email,
      },
    })

    return user || null
  }

  async create({ name, email, password }: User): Promise<void> {
    await this.db.user.create({ data: { name, email, password } })
  }
}
