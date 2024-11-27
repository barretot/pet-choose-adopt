import { InMemoryAdoptionRepository } from 'test/mocks/repositories/in-memory-adoption-repository'

interface ValidAdoption {
  id: string
  userId: string
  petId: string
}

interface MockDependencies {
  inMemoryAdoptionRepository: InMemoryAdoptionRepository
  validAdoption: ValidAdoption
}

export class AdoptionBuilder {
  private mockDependencies: MockDependencies

  constructor() {
    this.mockDependencies = {
      inMemoryAdoptionRepository: new InMemoryAdoptionRepository(),
      validAdoption: {
        id: 'fbf60978-f1a0-4a1b-919d-eb0cdecead3b',
        userId: 'd87f033b-6e27-4ea0-8bef-12f9991ee79b',
        petId: '755d0474-9e41-489d-bd25-e48734592c21',
      },
    }
  }

  public success(): AdoptionBuilder {
    return this
  }

  public build(): MockDependencies {
    return this.mockDependencies
  }
}
