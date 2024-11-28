import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { AppModule } from '@/infrastructure/app.module'
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service'

interface MockDependencies {
  app: INestApplication
  prisma: PrismaService
}

export class UserE2EBuilder {
  private mockDependencies: Partial<MockDependencies>

  constructor() {
    this.mockDependencies = {}
  }

  public async success(): Promise<UserE2EBuilder> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    const app = moduleRef.createNestApplication()
    const prisma = moduleRef.get(PrismaService)

    await app.init()

    this.mockDependencies = { app, prisma }

    return this
  }

  public build(): MockDependencies {
    return this.mockDependencies as MockDependencies
  }
}
