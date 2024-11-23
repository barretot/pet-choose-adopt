import { Module } from '@nestjs/common'

import { AdoptionRepository } from '@/domain/repositories/adoption/AdoptionRepository'
import { PetRepository } from '@/domain/repositories/pet/PetRepository'
import { UserRepository } from '@/domain/repositories/user/UserRepository'

import { DrizzleService } from './drizzle/drizzle.service'
import { DrizzleAdoptionRepository } from './drizzle/repositories/adoption/adoption-repository'
import { DrizzlePetRepository } from './drizzle/repositories/pet/pet-repository'
import { DrizzleUserRepository } from './drizzle/repositories/user/user-repository'

@Module({
  providers: [
    DrizzleService,
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
    {
      provide: PetRepository,
      useClass: DrizzlePetRepository,
    },
    {
      provide: AdoptionRepository,
      useClass: DrizzleAdoptionRepository,
    },
  ],
  exports: [DrizzleService, UserRepository, PetRepository, AdoptionRepository],
})
export class DatabaseModule {}
