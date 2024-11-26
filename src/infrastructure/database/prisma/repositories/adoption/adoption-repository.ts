import { Injectable } from '@nestjs/common'

import { Adoption } from '@/core/domain/entities/adoption/Adoption'
import { AdoptionRepository } from '@/core/domain/repositories/adoption/AdoptionRepository'

import { PrismaService } from '../../prisma.service'

@Injectable()
export class PrismaAdoptionRepository implements AdoptionRepository {
  constructor(private db: PrismaService) {}

  async create({ userId, petId }: Adoption): Promise<void> {
    await this.db.adoption.create({ data: { userId, petId } })
  }
}
