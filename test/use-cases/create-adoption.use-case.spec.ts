import { CreateAdoptionUseCase } from '@/use-cases/adoption/create-adoption.use-case'
import { AdoptionExistsException } from '@/use-cases/adoption/errors/adoption-exists-exception'
import { PetNotFoundException } from '@/use-cases/adoption/errors/pet-not-found-exception'
import { AdoptionBuilder } from 'test/use-cases/builders/adoption-builder'

describe('Adoption Use Case', () => {
  it('should return success when creating a adoption', async () => {
    const { inMemoryAdoptionRepository, inMemoryPetRepository, validAdoption } =
      new AdoptionBuilder().success().build()

    const sut = new CreateAdoptionUseCase(
      inMemoryAdoptionRepository,
      inMemoryPetRepository,
    )

    const result = await sut.execute(validAdoption)

    expect(result.isRight()).toBe(true)
    expect(inMemoryAdoptionRepository.items).toHaveLength(1)
    expect(result.value).toEqual(
      expect.objectContaining({
        adoption: expect.any(Object),
      }),
    )
  })

  it('should return error when adoption exists', async () => {
    const { inMemoryAdoptionRepository, inMemoryPetRepository, validAdoption } =
      new AdoptionBuilder().adoptionExistsException().build()

    const sut = new CreateAdoptionUseCase(
      inMemoryAdoptionRepository,
      inMemoryPetRepository,
    )

    inMemoryAdoptionRepository.create(validAdoption)

    const result = await sut.execute(validAdoption)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AdoptionExistsException)
  })

  it('should return error when pet not exists', async () => {
    const { inMemoryAdoptionRepository, inMemoryPetRepository, validAdoption } =
      new AdoptionBuilder().petNotFoundException().build()

    const sut = new CreateAdoptionUseCase(
      inMemoryAdoptionRepository,
      inMemoryPetRepository,
    )

    const result = await sut.execute(validAdoption)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PetNotFoundException)
  })
})
