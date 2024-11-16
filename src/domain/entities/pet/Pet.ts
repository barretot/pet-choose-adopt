export class Pet {
  id?: string
  name!: string
  type!: string
  image?: string | null

  constructor({ name, type, image }: Pet) {
    return Object.assign(this, { name, type, image })
  }
}
