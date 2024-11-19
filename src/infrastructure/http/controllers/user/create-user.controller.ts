import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { CreateUserValidator } from '@/infrastructure/http/validators/user/create-user.validator'
import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case'

import { HttpBadRequestUserResponse } from '../../swagger/responses/user/create-user-error.response'
import { HttpCreatedUserResponse } from '../../swagger/responses/user/create-user.response'

@ApiTags('user')
@Controller('/user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create user from db' })
  @ApiCreatedResponse({
    description: 'User Created',
    type: HttpCreatedUserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: HttpBadRequestUserResponse,
  })
  async handle(@Res() res, @Body() body: CreateUserValidator) {
    await this.createUserUseCase.execute({ ...body })

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, message: 'User created' })
  }
}
