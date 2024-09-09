import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';


/**
 * 
 * @param roles es un array de roles validos para la ruta, estos estan en el enum auth/interfaces/valid-roles.ts/ValidRoles
 * @property RoleProtected es un decorador que recibe un array de roles validos para la ruta y los asigna a la metadata de la ruta
 * @property UseGuards es un decorador que recibe un array de guards para la ruta
 * @property AuthGuard es un guard que protege la ruta con passport jwt y verifica que el token sea valido y este firmado por el servidor
 * @property UserRoleGuard es un guard que protege la ruta y verifica que el usuario tenga el rol necesario para acceder a la ruta
 * @returns un array de decoradores que protegen la ruta con passport jwt y verifican que el usuario tenga el rol necesario para acceder a la ruta
 */
export function Auth(...roles: ValidRoles[]) {

  return applyDecorators(
    RoleProtected(...roles),
    UseGuards( AuthGuard(), UserRoleGuard ),
  );

}
