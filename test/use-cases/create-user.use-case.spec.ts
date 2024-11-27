import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case'
import { UserAlreadyExistsException } from '@/use-cases/user/errors/user-already-exists-exception'
import { UserBuilder } from 'test/builders/user-builder'

describe('Create user Use Case', () => {
  it('should return success when creating a user', async () => {
    const { inMemoryUserRepository, hasher, validUser } = new UserBuilder()
      .success()
      .build()

    const sut = new CreateUserUseCase(inMemoryUserRepository, hasher)

    const result = await sut.execute(validUser)

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(1)
    expect(result.value).toEqual(
      expect.objectContaining({
        user: expect.any(Object),
      }),
    )
  })

  it('should return UserAlreadyExistsException when user exists', async () => {
    const { inMemoryUserRepository, hasher } = new UserBuilder()
      .userAlreadyExistsException()
      .build()

    const sut = new CreateUserUseCase(inMemoryUserRepository, hasher)

    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: 'plaintextPassword',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsException)
  })
})
