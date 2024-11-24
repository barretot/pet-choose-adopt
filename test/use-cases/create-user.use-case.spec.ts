import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case'
import { UserBuilder } from 'test/builders/user-builder'

describe('Create user Use Case', () => {
  it('should return success when creating a user', async () => {
    const { inMemoryUserRepository, hasher, validUser } = new UserBuilder()
      .success()
      .build()

    const sut = new CreateUserUseCase(inMemoryUserRepository, hasher)

    const createUserResponse = await sut.execute(validUser)

    expect(createUserResponse.isRight()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(1)
    expect(createUserResponse.value).toEqual(
      expect.objectContaining({
        user: expect.any(Object),
      }),
    )
  })
})
