import { Injectable } from '@nestjs/common'

import { Adoption } from '@/core/domain/entities/adoption/Adoption'
import { AdoptionRepository } from '@/core/domain/repositories/adoption/AdoptionRepository'

interface CreateAdoptionDto {
  userId: string
  petId: string
}

@Injectable()
export class CreateAdoptionUseCase {
  constructor(private petRepository: AdoptionRepository) {}

  async execute({ userId, petId }: CreateAdoptionDto): Promise<void> {
    const adoption = Adoption.create({
      userId,
      petId,
    })

    await this.petRepository.create({ ...adoption })
  }
}
