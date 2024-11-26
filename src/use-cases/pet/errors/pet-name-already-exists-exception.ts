export class PetNameAlreadyExistsException extends Error {
  constructor(name: string, type: string) {
    super(`O nome: "${name}" já existe para um outro "${type}" escolha outro.`)
  }
}
