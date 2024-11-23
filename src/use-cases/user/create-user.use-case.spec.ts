import { User } from '@/core/domain/entities/user/User'
import { CryptographyAdapterMock } from 'test/cryptography/cryptography-adapter.mock'
import { InMemoryDatabaseService } from 'test/repositories/in-memory-database.service'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'

import { CreateUserUseCase } from './create-user.use-case'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase
let inMemoryDataBaseService: InMemoryDatabaseService<User>
let cryptographyAdapter: CryptographyAdapterMock

describe('Create user Use Case', () => {
  beforeEach(() => {
    inMemoryDataBaseService = new InMemoryDatabaseService<User>()
    inMemoryUserRepository = new InMemoryUserRepository(inMemoryDataBaseService)
    cryptographyAdapter = new CryptographyAdapterMock()
    sut = new CreateUserUseCase(inMemoryUserRepository, cryptographyAdapter)
  })

  it('should return success when creating a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@brasil.com',
      password: 'passwordTest123',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(1)
    expect(result.value).toEqual(
      expect.objectContaining({
        user: expect.any(Object),
      }),
    )
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await cryptographyAdapter.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
  })
})
