import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { User } from '../entities/user.entity';
import { META_ROLES } from '../decorators';

/**
 * Guard to validate if the user has the necessary role to access the route protected by the RoleProtected decorator.
 */
@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: number[] = this.reflector.get(META_ROLES, context.getHandler());
    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    
    if ( !user || !user.role ) 
      throw new BadRequestException('User not found guard roles');
    
    if ( validRoles.includes( user.role.id_role )) return true;

    throw new ForbiddenException(`Don't have permission to access this route`);
  }
}
