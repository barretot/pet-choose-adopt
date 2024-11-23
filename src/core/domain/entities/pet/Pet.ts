import { randomUUID } from 'crypto'

export class Pet {
  id?: string
  name!: string
  type!: string

  constructor(props: Pet) {
    if (!props.id) {
      this.id = randomUUID()
    }
    Object.assign(this, props)
  }

  static create(props: Pet): Pet {
    const user = new Pet(props)

    return user
  }
}
