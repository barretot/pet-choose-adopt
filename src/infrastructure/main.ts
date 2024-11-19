import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { Env } from './env/env'
import { HttpExceptionFilter } from './http/interceptors/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('NestJS Api')
    .setDescription('')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs/v1', app, document)

  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap()
