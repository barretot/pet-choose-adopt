import { CreatePetUseCase } from '@/use-cases/pet/create-pet.use-case'
import { PetNameAlreadyExistsException } from '@/use-cases/pet/errors/pet-name-already-exists-exception'
import { PetBuilder } from 'test/builders/pet-builder'

describe('Pet Use Case', () => {
  it('should return success when creating a pet', async () => {
    const { inMemoryPetRepository, validPet } = new PetBuilder()
      .success()
      .build()

    const sut = new CreatePetUseCase(inMemoryPetRepository)

    const result = await sut.execute(validPet)

    expect(result.isRight()).toBe(true)
    expect(inMemoryPetRepository.items).toHaveLength(1)
    expect(result.value).toEqual(
      expect.objectContaining({
        pet: expect.any(Object),
      }),
    )
  })

  it('should return UserAlreadyExistsException when pet exists', async () => {
    const { inMemoryPetRepository } = new PetBuilder()
      .petNameAlreadyExistsException()
      .build()

    const sut = new CreatePetUseCase(inMemoryPetRepository)

    const result = await sut.execute({
      name: 'Nina',
      type: 'DOG',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PetNameAlreadyExistsException)
  })
})
