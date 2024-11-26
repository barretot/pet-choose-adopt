import { Injectable } from '@nestjs/common'

import { Pet } from '@/core/domain/entities/pet/Pet'
import { PetRepository } from '@/core/domain/repositories/pet/PetRepository'

import { PrismaService } from '../../prisma.service'

@Injectable()
export class PrismaPetRepository implements PetRepository {
  constructor(private db: PrismaService) {}

  async create({ name, type }: Pet): Promise<void> {
    await this.db.pet.create({
      data: {
        name,
        type,
      },
    })
  }

  async getPetByType(name: string, type: string): Promise<Pet[] | null> {
    const pet = await this.db.pet.findMany({
      where: {
        name,
        type,
      },
    })

    return pet
  }
}
