import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { EnvModule } from './env/env.module'
import { validateEnv } from './env/validate-envs'
import { HttpModule } from '../infrastructure/http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    HttpModule,
    AuthModule,
    EnvModule,
  ],
})
export class AppModule {}
