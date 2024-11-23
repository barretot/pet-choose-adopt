import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAdoptionValidator {
  @IsNotEmpty()
  @IsString()
  userId!: string

  @IsNotEmpty()
  @IsString()
  petId!: string
}
