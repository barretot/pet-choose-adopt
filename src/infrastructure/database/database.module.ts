import { Module } from '@nestjs/common'

import { PetRepository } from '@/domain/repositories/pet/PetRepository'
import { UserRepository } from '@/domain/repositories/user/UserRepository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaPetRepository } from './prisma/repositories/pet/pet-repository'
import { PrismaUserRepository } from './prisma/repositories/user/user-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: PetRepository,
      useClass: PrismaPetRepository,
    },
  ],
  exports: [PrismaService, UserRepository, PetRepository],
})
export class DatabaseModule {}
