import { Pet } from '../../entities/pet/Pet'

export abstract class PetRepository {
  abstract create(pet: Pet): Promise<void>
  abstract getPetByType(name: string, type: string): Promise<Pet[] | null>
}
