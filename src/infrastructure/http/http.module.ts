import { Module } from '@nestjs/common'

import { CreateUserUseCase } from '@/use-cases/create-user.use-case'

import { CreateUserController } from './controllers/create-user.controller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, CryptographyModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
