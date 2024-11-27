import { Injectable } from '@nestjs/common'

import { Adoption } from '@/core/domain/entities/adoption/Adoption'
import { AdoptionRepository } from '@/core/domain/repositories/adoption/AdoptionRepository'

@Injectable()
export class InMemoryAdoptionRepository implements AdoptionRepository {
  public items: Adoption[] = []

  async create(adoption: Adoption) {
    this.items.push(adoption)
  }
}
