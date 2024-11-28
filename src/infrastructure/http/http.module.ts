import { Module } from '@nestjs/common'

import { CreateAdoptionUseCase } from '@/use-cases/adoption/create-adoption.use-case'
import { CreateAuthenticateUseCase } from '@/use-cases/authenticate/create-authenticate.use-case'
import { CreatePetUseCase } from '@/use-cases/pet/create-pet.use-case'
import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case'

import { AuthModule } from '../auth/auth.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { CreateAdoptionController } from './controllers/adoption/create-adoption.controller'
import { CreateAuthenticateController } from './controllers/authenticate/create-authenticate.controller'
import { CreatePetController } from './controllers/pet/create-pet.controller'
import { CreateUserController } from './controllers/user/create-user.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, AuthModule],
  controllers: [
    CreateUserController,
    CreatePetController,
    CreateAdoptionController,
    CreateAuthenticateController,
  ],
  providers: [
    CreateUserUseCase,
    CreatePetUseCase,
    CreateAdoptionUseCase,
    CreateAuthenticateUseCase,
  ],
})
export class HttpModule {}
