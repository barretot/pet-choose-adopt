export class PetNotFoundException extends Error {
  constructor() {
    super('The pet you are trying to adopt is not available')
  }
}
