import { Module } from '@nestjs/common'

import { AdoptionRepository } from '@/core/domain/repositories/adoption/AdoptionRepository'
import { PetRepository } from '@/core/domain/repositories/pet/PetRepository'
import { UserRepository } from '@/core/domain/repositories/user/UserRepository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaAdoptionRepository } from './prisma/repositories/adoption/adoption-repository'
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
    {
      provide: AdoptionRepository,
      useClass: PrismaAdoptionRepository,
    },
  ],
  exports: [PrismaService, UserRepository, PetRepository, AdoptionRepository],
})
export class DatabaseModule {}
