import { User } from '@/core/domain/entities/user/User'
import { CryptographyAdapterMock } from 'test/mocks/cryptography/cryptography-adapter.mock'
import { InMemoryDatabaseService } from 'test/mocks/repositories/in-memory-database.service'
import { InMemoryUserRepository } from 'test/mocks/repositories/in-memory-user-repository'

interface ValidUser {
  name: string
  email: string
  password: string
  id: string
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
      inMemoryUserRepository: new InMemoryUserRepository(
        new InMemoryDatabaseService<User>(),
      ),
      validUser: {
        name: 'Jane Doe',
        email: 'jane.doe@mail.com',
        password: 'plaintextPassword',
        id: 'custom-id',
      },
    }
  }

  public success(): UserBuilder {
    return this
  }

  public build(): MockDependencies {
    return this.mockDependencies
  }
}
