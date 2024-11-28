import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { CurrentUser } from '@/infrastructure/auth/jwt/current-user.decorator'
import { TokenSchema as UserPayload } from '@/infrastructure/auth/jwt/token-schema'
import { CreateAdoptionUseCase } from '@/use-cases/adoption/create-adoption.use-case'

import { CreateAdoptionDto } from '../../dto/adoption/create-adoption.dto'
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'
import { HttpCreatedAdoptionResponse } from '../../swagger/responses/adoption/create-pet.response'

@ApiTags('adoptions')
@Controller('/adoption')
export class CreateAdoptionController {
  constructor(private createAdoptionUseCase: CreateAdoptionUseCase) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create adoption from db' })
  @ApiCreatedResponse({
    description: 'Adoption Created',
    type: HttpCreatedAdoptionResponse,
  })
  async handle(
    @CurrentUser() logedUser: UserPayload,
    @Res() res,
    @Body() body: CreateAdoptionDto,
  ) {
    const { petId } = body
    const userId = logedUser.sub

    const result = await this.createAdoptionUseCase.execute({
      userId: userId,
      petId: petId,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, message: 'Adoption created' })
  }
}
