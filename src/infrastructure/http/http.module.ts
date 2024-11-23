import { Module } from '@nestjs/common'

import { CreateAdoptionUseCase } from '@/use-cases/adoption/create-adoption.use-case'
import { CreatePetUseCase } from '@/use-cases/pet/create-pet.use-case'
import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { CreateAdoptionController } from './controllers/adoption/create-adoption.controller'
import { CreatePetController } from './controllers/pet/create-pet.controller'
import { CreateUserController } from './controllers/user/create-user.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, CryptographyModule],
  controllers: [
    CreateUserController,
    CreatePetController,
    CreateAdoptionController,
  ],
  providers: [CreateUserUseCase, CreatePetUseCase, CreateAdoptionUseCase],
})
export class HttpModule {}
