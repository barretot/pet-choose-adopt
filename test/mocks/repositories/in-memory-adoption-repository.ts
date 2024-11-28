import { Injectable } from '@nestjs/common'

import { Adoption } from '@/core/domain/entities/adoption/Adoption'
import { AdoptionRepository } from '@/core/domain/repositories/adoption/AdoptionRepository'

@Injectable()
export class InMemoryAdoptionRepository implements AdoptionRepository {
  public items: Adoption[] = []
  async getAdoption(userId: string, petId: string): Promise<Adoption | null> {
    const adoption = this.items.find(
      (item) => item.userId === userId && item.petId === petId,
    )

    if (!adoption) {
      return null
    }

    return adoption
  }

  async create(adoption: Adoption) {
    this.items.push(adoption)
  }
}
