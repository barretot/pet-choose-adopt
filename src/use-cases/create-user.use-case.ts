import { Injectable } from '@nestjs/common'

import { CryptographyAdapter } from '@/adapters/cryptography/cryptography-adapter'
import { User } from '@/domain/entities/User'
import { UserRepository } from '@/domain/repositories/UserRepository'

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private cryptography: CryptographyAdapter,
  ) {}

  async execute({
    name,
    email,
    password,
  }: {
    name: string
    email: string
    password: string
  }): Promise<{ user: User }> {
    const hash = await this.cryptography.hash(password)

    const user = await this.userRepository.create({
      name,
      email,
      password: hash,
    })

    return { user }
  }
}
