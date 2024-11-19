import { CryptographyAdapter } from '@/adapters/cryptography/cryptography-adapter'
import { User } from '@/domain/entities/user/User'
import { CryptographyAdapterMock } from 'test/cryptography/cryptography-adapter.mock'
import { InMemoryDatabaseService } from 'test/repositories/in-memory-database.service'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'

import { CreateUserUseCase } from './create-user.use-case'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase
let inMemoryDataBaseService: InMemoryDatabaseService<User>
let cryptographyAdapter: CryptographyAdapter

describe('Create user Use Case', () => {
  beforeEach(() => {
    inMemoryDataBaseService = new InMemoryDatabaseService<User>()
    inMemoryUserRepository = new InMemoryUserRepository(inMemoryDataBaseService)
    cryptographyAdapter = new CryptographyAdapterMock()
    sut = new CreateUserUseCase(inMemoryUserRepository, cryptographyAdapter)
  })

  it('should return sucess when create a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@brasil.com',
      password: 'passwordTest123',
    })

    expect(result.user).toEqual(
      expect.objectContaining({
        email: 'john.doe@brasil.com',
      }),
    )
  })
})
