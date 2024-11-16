import { Injectable } from '@nestjs/common'

import { Pet } from '@/domain/entities/pet/Pet'
import { PetRepository } from '@/domain/repositories/pet/PetRepository'
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service'

@Injectable()
export class PrismaPetRepository implements PetRepository {
  constructor(private db: PrismaService) {}

  async create({ name, type }: Pet): Promise<void> {
    const pet = new Pet({
      name,
      type,
    })

    await this.db.pets.create({ data: { ...pet } })
  }
}
