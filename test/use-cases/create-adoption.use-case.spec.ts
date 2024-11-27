import { CreateAdoptionUseCase } from '@/use-cases/adoption/create-adoption.use-case'
import { AdoptionBuilder } from 'test/builders/adoption-builder'

describe('Adoption Use Case', () => {
  it('should return success when creating a adoption', async () => {
    const { inMemoryAdoptionRepository, validAdoption } = new AdoptionBuilder()
      .success()
      .build()

    const sut = new CreateAdoptionUseCase(inMemoryAdoptionRepository)

    const result = await sut.execute(validAdoption)

    expect(result.isRight()).toBe(true)
    expect(inMemoryAdoptionRepository.items).toHaveLength(1)
    expect(result.value).toEqual(
      expect.objectContaining({
        adoption: expect.any(Object),
      }),
    )
  })
})
