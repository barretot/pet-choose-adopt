import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserValidator {
  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  name!: string

  @ApiProperty({ description: 'name' })
  @IsEmail()
  email!: string

  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  password!: string
}
