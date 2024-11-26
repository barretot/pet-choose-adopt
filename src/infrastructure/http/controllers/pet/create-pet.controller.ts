import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { CreatePetUseCase } from '@/use-cases/pet/create-pet.use-case'

import { CreatePetDto } from '../../dto/pet/create-pet.dto'
import { HttpBadRequestPetResponse } from '../../swagger/responses/pet/create-pet-error.response'
import { HttpCreatedPetResponse } from '../../swagger/responses/pet/create-pet.response'

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
  async handle(@Res() res, @Body() body: CreatePetDto) {
    const response = await this.createPetUseCase.execute(body)

    if (response.isLeft()) {
      const error = response.value

      throw new BadRequestException(error.message)
    }

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, message: 'Pet created' })
  }
}
