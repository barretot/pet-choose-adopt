import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class HttpCreatedAdoptionResponse {
  @ApiProperty({ example: HttpStatus.CREATED })
  statusCode!: string

  @ApiProperty({ description: 'Name of the user', example: 'Adoption created' })
  message!: string
}
