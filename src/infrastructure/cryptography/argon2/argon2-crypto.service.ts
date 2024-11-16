import { hash, verify } from 'argon2'

import { CryptographyAdapter } from '@/adapters/cryptography/cryptograpy-adapter'

export class Argon2Hasher implements CryptographyAdapter {
  async hash(password: string): Promise<string> {
    return hash(password, {
      type: 2,
      timeCost: 8,
    })
  }

  async compare(dbPassword: string, loginPassword: string): Promise<boolean> {
    return verify(dbPassword, loginPassword)
  }
}
