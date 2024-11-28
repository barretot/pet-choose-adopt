import { Injectable } from '@nestjs/common'

import { Adoption } from '@/core/domain/entities/adoption/Adoption'
import { AdoptionRepository } from '@/core/domain/repositories/adoption/AdoptionRepository'

import { PrismaService } from '../../prisma.service'

interface ResponseFindFirstAdoption {
  id: string
  petId: string
  userId: string
  createdAt: Date
}

@Injectable()
export class PrismaAdoptionRepository implements AdoptionRepository {
  constructor(private db: PrismaService) {}
  async getAdoption(userId: string, petId: string): Promise<Adoption | null> {
    const adoptions = await this.db.adoption.findFirst({
      where: {
        userId,
        petId,
      },
    })

    if (!adoptions) {
      return null
    }

    return adoptions as ResponseFindFirstAdoption
  }

  async create({ userId, petId }: Adoption): Promise<void> {
    await this.db.adoption.create({ data: { userId, petId } })
  }
}
