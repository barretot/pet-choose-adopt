import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAdoptionDto {
  @ApiProperty({ description: 'userId' })
  @IsNotEmpty()
  @IsString()
  userId!: string

  @ApiProperty({ description: 'petId' })
  @IsNotEmpty()
  @IsString()
  petId!: string
}
