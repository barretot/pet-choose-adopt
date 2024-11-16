export class User {
  id?: string
  name!: string
  email!: string
  password!: string

  constructor({ name, email, password }: User) {
    return Object.assign(this, { name, email, password })
  }
}
