import { Injectable } from '@nestjs/common'

import { Adoption } from '@/domain/entities/adoption/Adoption'
import { AdoptionRepository } from '@/domain/repositories/adoption/AdoptionRepository'

@Injectable()
export class CreateAdoptionUseCase {
  constructor(private petRepository: AdoptionRepository) {}

  async execute({ userId, petId }: Adoption): Promise<void> {
    const adoption = Adoption.create({
      userId,
      petId,
    })

    await this.petRepository.create({ ...adoption })
  }
}
