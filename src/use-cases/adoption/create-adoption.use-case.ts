import { Injectable } from '@nestjs/common'

import { Adoption } from '@/core/domain/entities/adoption/Adoption'
import { AdoptionRepository } from '@/core/domain/repositories/adoption/AdoptionRepository'
import { PetRepository } from '@/core/domain/repositories/pet/PetRepository'
import { Either, left, right } from '@/core/either'

import { AdoptionExistsException } from './errors/adoption-exists-exception'
import { PetNotFoundException } from './errors/pet-not-found-exception'

interface CreateAdoptionDto {
  userId: string
  petId: string
}

type CreateAdoptionUseCaseResponse = Either<
  PetNotFoundException | AdoptionExistsException,
  { adoption: Adoption }
>

@Injectable()
export class CreateAdoptionUseCase {
  constructor(
    private adoptionRepository: AdoptionRepository,
    private petRepository: PetRepository,
  ) {}

  async execute({
    userId,
    petId,
  }: CreateAdoptionDto): Promise<CreateAdoptionUseCaseResponse> {
    const adoptionAlreadyExists = await this.adoptionRepository.getAdoption(
      userId,
      petId,
    )

    if (adoptionAlreadyExists) {
      return left(new AdoptionExistsException(adoptionAlreadyExists!.id))
    }

    const petAlreadyExists = await this.petRepository.getById(petId)

    if (!petAlreadyExists) {
      return left(new PetNotFoundException())
    }

    const adoption = Adoption.create({
      userId,
      petId,
    })

    await this.adoptionRepository.create(adoption)

    return right({
      adoption,
    })
  }
}
