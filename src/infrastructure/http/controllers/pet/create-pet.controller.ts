import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { CreatePetUseCase } from '@/use-cases/pet/create-pet.use-case'

import { HttpBadRequestPetResponse } from '../../swagger/responses/pet/create-pet-error.response'
import { HttpCreatedPetResponse } from '../../swagger/responses/pet/create-pet.response'
import { CreatePetValidator } from '../../validators/pet/create-pet.validator'

@ApiTags('pet')
@Controller('/pet')
export class CreatePetController {
  constructor(private createPetUseCase: CreatePetUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create user from db' })
  @ApiCreatedResponse({
    description: 'Pet Created',
    type: HttpCreatedPetResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: HttpBadRequestPetResponse,
  })
  async handle(@Res() res, @Body() body: CreatePetValidator) {
    await this.createPetUseCase.execute({ ...body })

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, message: 'Pet created' })
  }
}
