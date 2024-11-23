import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { CreateAdoptionUseCase } from '@/use-cases/adoption/create-adoption.use-case'

import { CreateAdoptionDto } from '../../dto/adoption/create-adoption.dto'
import { HttpCreatedAdoptionResponse } from '../../swagger/responses/adoption/create-pet.response'

@ApiTags('adoptions')
@Controller('/adoption')
export class CreateAdoptionController {
  constructor(private createAdoptionUseCase: CreateAdoptionUseCase) {}
  @Post()
  @ApiOperation({ summary: 'Create adoption from db' })
  @ApiCreatedResponse({
    description: 'Adoption Created',
    type: HttpCreatedAdoptionResponse,
  })
  async handle(@Res() res, @Body() body: CreateAdoptionDto) {
    await this.createAdoptionUseCase.execute(body)

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, message: 'Adoption created' })
  }
}
