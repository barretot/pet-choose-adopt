import { Injectable } from '@nestjs/common'

import { Adoption } from '@/core/domain/entities/adoption/Adoption'
import { AdoptionRepository } from '@/core/domain/repositories/adoption/AdoptionRepository'

import { DrizzleService } from '../../drizzle.service'
import { adoptions } from '../../schemas'

@Injectable()
export class DrizzleAdoptionRepository implements AdoptionRepository {
  constructor(private drizzleService: DrizzleService) {}

  async create({ userId, petId }: Adoption): Promise<void> {
    await this.drizzleService.db.insert(adoptions).values({ userId, petId })
  }
}
