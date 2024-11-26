import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { PetType } from '@/core/domain/enums/pet-type.enum'

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsEnum(PetType, { message: 'Type only cat, dog or other.' })
  type!: string
}
