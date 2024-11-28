import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { EncrypterAdapter } from '@/core/adapters/auth/encrypter-adapter'

import { Env } from '../env/env'
import { JwtEncrypter } from './jwt/jwt-encrypter'
import { JwtStrategy } from './jwt/jwt-strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        privateKey: Buffer.from(
          config.get<string>('JWT_PRIVATE_KEY'),
          'base64',
        ),
        publicKey: Buffer.from(config.get<string>('JWT_PUBLIC_KEY'), 'base64'),
        signOptions: { algorithm: 'RS256' },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    { provide: EncrypterAdapter, useClass: JwtEncrypter },
  ],
  exports: [JwtModule, EncrypterAdapter],
})
export class AuthModule {}
