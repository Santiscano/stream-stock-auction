import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';

export const META_ROLES = 'roles';

/**
 * Decorator to protect a route with roles with the given roles
 * @param args List of roles to protect the route
 * @returns metadata to be used in the guard to validate the roles of the user who is trying to access the route
 */
export const RoleProtected = (...args: ValidRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
