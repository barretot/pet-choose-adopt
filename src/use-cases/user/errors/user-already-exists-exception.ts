export class UserAlreadyExistsException extends Error {
  constructor(identifier: string) {
    super(`Student "${identifier}" already exists.`)
  }
}
