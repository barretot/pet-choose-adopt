import { Body, Controller, Post } from '@nestjs/common'

import { CreatePetUseCase } from '@/use-cases/pet/create-pet.use-case'

import { CreatePetValidator } from '../../validators/pet/create-pet.validator'

@Controller('/pet')
export class CreatePetController {
  constructor(private createPetUseCase: CreatePetUseCase) {}

  @Post()
  async handle(@Body() body: CreatePetValidator) {
    await this.createPetUseCase.execute({ ...body })
  }
}
