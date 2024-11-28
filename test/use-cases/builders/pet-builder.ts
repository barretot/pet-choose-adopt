import { InMemoryPetRepository } from 'test/mocks/repositories/in-memory-pet-repository'

interface ValidPet {
  id: string
  name: string
  type: string
}

interface MockDependencies {
  inMemoryPetRepository: InMemoryPetRepository
  validPet: ValidPet
}

export class PetBuilder {
  private mockDependencies: MockDependencies

  constructor() {
    this.mockDependencies = {
      inMemoryPetRepository: new InMemoryPetRepository(),
      validPet: {
        id: 'fbf60978-f1a0-4a1b-919d-eb0cdecead3b',
        name: 'Nina',
        type: 'DOG',
      },
    }
  }

  public success(): PetBuilder {
    return this
  }

  public petNameAlreadyExistsException(): PetBuilder {
    this.mockDependencies.inMemoryPetRepository.create({
      id: 'fbf60978-f1a0-4a1b-919d-eb0cdecead3b',
      name: 'Nina',
      type: 'DOG',
    })

    return this
  }

  public build(): MockDependencies {
    return this.mockDependencies
  }
}
