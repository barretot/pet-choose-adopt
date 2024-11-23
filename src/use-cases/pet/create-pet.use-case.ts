import { Injectable } from '@nestjs/common'

import { Pet } from '@/core/domain/entities/pet/Pet'
import { PetRepository } from '@/core/domain/repositories/pet/PetRepository'

interface CreatePetDto {
  name: string
  type: string
}

@Injectable()
export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ name, type }: CreatePetDto): Promise<{ pet: Pet }> {
    const pet = Pet.create({
      name,
      type,
    })

    await this.petRepository.create({ ...pet })

    return { pet }
  }
}
