import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import configuration from '../config/configuration'
import { HttpModule } from '../infrastructure/http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    HttpModule,
  ],
})
export class AppModule {}
