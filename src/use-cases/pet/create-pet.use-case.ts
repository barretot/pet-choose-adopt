import { Injectable } from '@nestjs/common'

import { Pet } from '@/core/domain/entities/pet/Pet'
import { PetRepository } from '@/core/domain/repositories/pet/PetRepository'
import { Either, left, right } from '@/core/either'

import { PetNameAlreadyExistsException } from './errors/pet-name-already-exists-exception'

interface CreatePetDto {
  name: string
  type: string
}

type CreatePetUseCaseResponse = Either<
  PetNameAlreadyExistsException,
  { pet: Pet }
>

@Injectable()
export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    name,
    type,
  }: CreatePetDto): Promise<CreatePetUseCaseResponse> {
    const pet = Pet.create({
      name,
      type,
    })

    const petNameAlreadyExists = await this.petRepository.getPetByType(
      name,
      type,
    )

    if (petNameAlreadyExists) {
      return left(new PetNameAlreadyExistsException(name, type))
    }

    await this.petRepository.create({ ...pet })

    return right({
      pet,
    })
  }
}
