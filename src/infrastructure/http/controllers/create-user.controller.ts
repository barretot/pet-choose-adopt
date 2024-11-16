import { Body, Controller, Post } from '@nestjs/common'

import { CreateUserValidator } from '@/infrastructure/validators/create-user.validator'
import { CreateUserUseCase } from '@/use-cases/create-user.use-case'

@Controller('/user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async handle(@Body() body: CreateUserValidator) {
    const { user } = await this.createUserUseCase.execute({ ...body })

    return { user }
  }
}
