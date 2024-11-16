import { Injectable } from '@nestjs/common'

import { User } from '@/domain/entities/user/User'
import { UserRepository } from '@/domain/repositories/user/UserRepository'
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
    const user = new User({
      name,
      email,
      password,
    })

    await this.db.user.create({ data: { ...user } })
  }
}
