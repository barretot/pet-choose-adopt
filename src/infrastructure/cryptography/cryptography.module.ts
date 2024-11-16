import { Module } from '@nestjs/common'

import { CryptographyAdapter } from '@/adapters/cryptography/cryptography-adapter'

import { Argon2Hasher } from './argon2/argon2-crypto.service'

@Module({
  providers: [{ provide: CryptographyAdapter, useClass: Argon2Hasher }],
  exports: [CryptographyAdapter],
})
export class CryptographyModule {}
