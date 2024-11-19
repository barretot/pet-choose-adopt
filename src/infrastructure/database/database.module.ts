import { Module } from '@nestjs/common'

import { PetRepository } from '@/domain/repositories/pet/PetRepository'
import { UserRepository } from '@/domain/repositories/user/UserRepository'

import { DrizzleService } from './drizzle/drizzle.service'
import { DrizzlePetRepository } from './drizzle/repositories/pet/pet-repository'
import { DrizzleUserRepository } from './drizzle/repositories/user/user-repository'
import { PrismaService } from './prisma/prisma.service'
// import { PrismaPetRepository } from './prisma/repositories/pet/pet-repository'
// import { PrismaUserRepository } from './prisma/repositories/user/user-repository'

@Module({
  providers: [
    PrismaService,
    DrizzleService,
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
    {
      provide: PetRepository,
      useClass: DrizzlePetRepository,
    },
  ],
  exports: [PrismaService, DrizzleService, UserRepository, PetRepository],
})
export class DatabaseModule {}
