import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { CreateUserValidator } from '@/infrastructure/http/validators/user/create-user.validator'
import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case'

@Controller('/user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateUserValidator) {
    await this.createUserUseCase.execute({ ...body })
  }
}
