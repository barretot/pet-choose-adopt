import { Injectable } from '@nestjs/common'

import { PetRepository } from '@/domain/repositories/pet/PetRepository'

@Injectable()
export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ name, type }: { name: string; type: string }): Promise<void> {
    await this.petRepository.create({ name, type })
  }
}
