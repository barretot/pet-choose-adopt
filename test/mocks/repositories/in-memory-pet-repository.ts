import { Injectable } from '@nestjs/common'

import { Pet } from '@/core/domain/entities/pet/Pet'
import { PetRepository } from '@/core/domain/repositories/pet/PetRepository'

@Injectable()
export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []
  async getById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(pet: Pet) {
    this.items.push(pet)
  }
  async getPetByType(name: string, type: string) {
    const pets = this.items.filter(
      (item) => item.name === name && item.type === type,
    )

    if (!pets) {
      return null
    }

    return pets
  }
}
