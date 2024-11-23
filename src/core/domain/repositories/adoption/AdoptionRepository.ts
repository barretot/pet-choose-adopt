import { Adoption } from '../../entities/adoption/Adoption'

export abstract class AdoptionRepository {
  abstract create(pet: Adoption): Promise<void>
}
