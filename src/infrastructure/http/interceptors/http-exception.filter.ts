import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const reply = ctx.getResponse<FastifyReply>()
    const request = ctx.getRequest<FastifyRequest>()
    const status = exception.getStatus()

    const response = exception.getResponse()
    const errorDetails =
      typeof response === 'string'
        ? { message: response }
        : (response as object)

    const errorResponse = {
      statusCode: status,
      path: request.url,
      ...errorDetails,
    }

    reply.status(status).send(errorResponse)
  }
}
