import { Injectable } from '@nestjs/common'

import { Pet } from '@/domain/entities/pet/Pet'
import { PetRepository } from '@/domain/repositories/pet/PetRepository'

@Injectable()
export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ name, type }: { name: string; type: string }): Promise<void> {
    const pet = Pet.create({
      name,
      type,
    })

    await this.petRepository.create({ ...pet })
  }
}
