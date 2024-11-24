import { User } from '@/core/domain/entities/user/User'
import { CryptographyAdapterMock } from 'test/mocks/cryptography/cryptography-adapter.mock'
import { InMemoryDatabaseService } from 'test/mocks/repositories/in-memory-database.service'
import { InMemoryUserRepository } from 'test/mocks/repositories/in-memory-user-repository'

export class UserBuilder {
  private mockDependencies: {
    hasher: CryptographyAdapterMock
    inMemoryDatabaseService: InMemoryDatabaseService<User>
    inMemoryUserRepository: InMemoryUserRepository
  }

  constructor() {
    const inMemoryDatabaseService = new InMemoryDatabaseService<User>()
    const inMemoryUserRepository = new InMemoryUserRepository(
      inMemoryDatabaseService,
    )
    const hasher = new CryptographyAdapterMock()

    this.mockDependencies = {
      hasher,
      inMemoryDatabaseService,
      inMemoryUserRepository,
    }
  }

  public success(): UserBuilder {
    // Configurações específicas para um cenário "de sucesso"
    return this
  }

  public withCustomDependency(
    dependencyName: string,
    instance: unknown,
  ): UserBuilder {
    this.mockDependencies[dependencyName] = instance
    return this
  }

  public build(): {
    hasher: CryptographyAdapterMock
    inMemoryDatabaseService: InMemoryDatabaseService<User>
    inMemoryUserRepository: InMemoryUserRepository
  } {
    return this.mockDependencies
  }
}
