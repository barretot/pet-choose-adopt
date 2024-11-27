import { Injectable } from '@nestjs/common'

import { Adoption } from '@/core/domain/entities/adoption/Adoption'
import { AdoptionRepository } from '@/core/domain/repositories/adoption/AdoptionRepository'
import { Either, right } from '@/core/either'

interface CreateAdoptionDto {
  userId: string
  petId: string
}

type CreateAdoptionUseCaseResponse = Either<null, { adoption: Adoption }>

@Injectable()
export class CreateAdoptionUseCase {
  constructor(private adoptionRepository: AdoptionRepository) {}

  async execute({
    userId,
    petId,
  }: CreateAdoptionDto): Promise<CreateAdoptionUseCaseResponse> {
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
