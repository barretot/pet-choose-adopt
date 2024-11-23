import { Adoption } from '@/domain/entities/adoption/Adoption'

export abstract class AdoptionRepository {
  abstract create(pet: Adoption): Promise<void>
}
