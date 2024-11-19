import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { PetType } from '@/domain/enums/pet-type.enum'

export class CreatePetValidator {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsEnum(PetType, { message: 'Type only cat or dog' })
  type!: string
}
