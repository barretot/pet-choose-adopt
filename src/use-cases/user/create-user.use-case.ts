import { BadRequestException, Injectable } from '@nestjs/common'

import { CryptographyAdapter } from '@/adapters/cryptography/cryptography-adapter'
import { User } from '@/domain/entities/user/User'
import { UserRepository } from '@/domain/repositories/user/UserRepository'

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
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new BadRequestException('User exists')
    }

    const hash = await this.cryptography.hash(password)

    const user = User.create({
      name,
      email,
      password: hash,
    })

    await this.userRepository.create({ ...user })

    return { user }
  }
}
