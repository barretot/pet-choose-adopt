import { Injectable } from '@nestjs/common'

import { Pet } from '@/domain/entities/pet/Pet'
import { PetRepository } from '@/domain/repositories/pet/PetRepository'

import { DrizzleService } from '../../drizzle.service'
import { pets } from '../../schemas'

@Injectable()
export class DrizzlePetRepository implements PetRepository {
  constructor(private drizzleService: DrizzleService) {}

  async create({ name, type }: Pet): Promise<void> {
    await this.drizzleService.db.insert(pets).values({ name, type })
  }
}
