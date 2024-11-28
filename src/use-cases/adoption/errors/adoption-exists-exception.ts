export class AdoptionExistsException extends Error {
  constructor(adoptionId) {
    super(`This adoption already exists, adoptionId: ${adoptionId}`)
  }
}
