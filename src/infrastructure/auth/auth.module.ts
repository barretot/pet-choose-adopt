import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { EncrypterAdapter } from '@/core/adapters/auth/encrypter-adapter'

import { JwtEncrypter } from './jwt/jwt-encrypter'
import { JwtStrategy } from './jwt/jwt-strategy'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory(env: EnvService) {
        const privateKey = env.get('JWT_PRIVATE_KEY')
        const publicKey = env.get('JWT_PUBLIC_KEY')

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [
    JwtStrategy,
    { provide: EncrypterAdapter, useClass: JwtEncrypter },
  ],
  exports: [JwtModule, EncrypterAdapter],
})
export class AuthModule {}
