import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { hash, verify } from 'argon2'

import { CryptographyAdapter } from '@/adapters/cryptography/cryptography-adapter'
import { Env } from '@/infrastructure/env/env'

@Injectable()
export class Argon2Hasher implements CryptographyAdapter {
  constructor(private configService: ConfigService<Env, true>) {}
  async hash(password: string): Promise<string> {
    return hash(password, {
      type: this.configService.get('ARGON2_TYPE'),
      timeCost: this.configService.get('ARGON2_TIME_COST'),
    })
  }

  async compare(dbPassword: string, loginPassword: string): Promise<boolean> {
    return verify(dbPassword, loginPassword)
  }
}
