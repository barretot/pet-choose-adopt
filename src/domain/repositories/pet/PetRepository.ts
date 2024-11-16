import { Pet } from '@/domain/entities/pet/Pet'

export abstract class PetRepository {
  abstract create(pet: Pet): Promise<void>
}
