import { randomUUID } from 'node:crypto'

export class Adoption {
  id?: string
  petId!: string
  userId!: string

  constructor(props: Adoption) {
    if (!props.id) {
      this.id = randomUUID()
    }
    Object.assign(this, props)
  }

  static create(props: Adoption): Adoption {
    const user = new Adoption(props)

    return user
  }
}
