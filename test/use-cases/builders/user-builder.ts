import { CryptographyAdapterMock } from 'test/mocks/cryptography/cryptography-adapter.mock'
import { InMemoryUserRepository } from 'test/mocks/repositories/in-memory-user-repository'

interface ValidUser {
  id: string
  name: string
  email: string
  password: string
}

interface MockDependencies {
  hasher: CryptographyAdapterMock
  inMemoryUserRepository: InMemoryUserRepository
  validUser: ValidUser
}

export class UserBuilder {
  private mockDependencies: MockDependencies

  constructor() {
    this.mockDependencies = {
      hasher: new CryptographyAdapterMock(),
      inMemoryUserRepository: new InMemoryUserRepository(),
      validUser: {
        id: 'custom-id',
        name: 'Jane Doe',
        email: 'jane.doe@mail.com',
        password: 'plaintextPassword',
      },
    }
  }

  public success(): UserBuilder {
    return this
  }

  public userAlreadyExistsException(): UserBuilder {
    this.mockDependencies.inMemoryUserRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: 'plaintextPassword',
      id: 'custom-id',
    })

    return this
  }

  public build(): MockDependencies {
    return this.mockDependencies
  }
}
