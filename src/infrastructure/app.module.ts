import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
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
  ],
})
export class AppModule {}
