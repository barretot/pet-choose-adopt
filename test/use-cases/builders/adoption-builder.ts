import { InMemoryAdoptionRepository } from 'test/mocks/repositories/in-memory-adoption-repository'
import { InMemoryPetRepository } from 'test/mocks/repositories/in-memory-pet-repository'

interface ValidAdoption {
  id: string
  userId: string
  petId: string
}

interface MockDependencies {
  inMemoryAdoptionRepository: InMemoryAdoptionRepository
  inMemoryPetRepository: InMemoryPetRepository
  validAdoption: ValidAdoption
}

export class AdoptionBuilder {
  private mockDependencies: MockDependencies

  constructor() {
    this.mockDependencies = {
      inMemoryAdoptionRepository: new InMemoryAdoptionRepository(),
      inMemoryPetRepository: new InMemoryPetRepository(),
      validAdoption: {
        id: 'fbf60978-f1a0-4a1b-919d-eb0cdecead3b',
        userId: 'd87f033b-6e27-4ea0-8bef-12f9991ee79b',
        petId: 'fbf60978-f1a0-4a1b-919d-eb0cdecead3b',
      },
    }
  }

  public success(): AdoptionBuilder {
    this.mockDependencies.inMemoryPetRepository.create({
      id: 'fbf60978-f1a0-4a1b-919d-eb0cdecead3b',
      name: 'Nina',
      type: 'CAT',
    })
    return this
  }

  public petNotFoundException(): AdoptionBuilder {
    return this
  }
  public adoptionExistsException(): AdoptionBuilder {
    return this
  }

  public build(): MockDependencies {
    return this.mockDependencies
  }
}
