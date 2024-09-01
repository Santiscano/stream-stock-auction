import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

/**
 * Get the user from the request object
 * @param data The user data to return from the request object (optional) - if not provided, the entire user object is returned - if provided, the user return user[data]
 * @param ctx The execution context of the request object (from NestJS)
 * @returns The user object or the user data requested from the request object (if provided)
 * @throws InternalServerErrorException If the user is not found in the request object
 */
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    return !data ? user : user[data];
  },
);
