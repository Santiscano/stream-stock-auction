import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import {
  Auth,
  GetUser
} from './decorators';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create( createUserDto );
  }

  @Post('signin')
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.signin( loginUserDto );
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus( 
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }

  @Get('public')
  testPublicRoute() {
    return { ok: true, message: 'This is a public route' };
  }


  @Get('private-all-roles')
  @Auth()
  testingPrivateRoute( 
    @GetUser() user: User, // para acceder al user es necesario que sea privada porque el usuario se obtiene del token que se obtiene en el middleware de auth
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return { ok: true, message: 'This is a private route', user, headers };
  }

  @Get('private-only-admin')
  @Auth( ValidRoles.admin, ValidRoles.superAdmin )
  tesPrivateRouteOnlyAdmin(
    @GetUser() user: User,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return { ok: true, message: 'This is a private route only for admin', user, headers };
  }
}
