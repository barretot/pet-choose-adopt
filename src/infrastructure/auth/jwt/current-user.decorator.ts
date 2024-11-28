import { ExecutionContext, createParamDecorator } from '@nestjs/common'

import { TokenSchema as UserPayload } from './token-schema'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  },
)
