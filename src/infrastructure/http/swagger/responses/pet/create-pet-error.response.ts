import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class HttpBadRequestPetResponse {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode!: string

  @ApiProperty({ example: '/api/pet' })
  path!: string

  @ApiProperty({ example: 'User exists' })
  message!: string

  @ApiProperty({ example: 'Bad Request' })
  error!: string
}
