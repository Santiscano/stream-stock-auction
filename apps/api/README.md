<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

### AUTH
Sistema de autenticacion y autorizacion, con login, register y rutas protegidas.
Para usarse en modulos externos es necesario llamar el decorador @Auth() el cual puede ser sin parametros y esto significa que solo necesita el token, pero si se le entregan parametros entonces solo sera permitido para el rol que este ahi EJM:
```ts
// .controller.ts
import { Controller, Get, Headers } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';

import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';


@Controller('auth')
export class AuthController {

  /*
  * ruta publica que no necestia Token
  */
  @Get('public')
  testPublicRoute() {
    return { 
      ok: true, 
      message: 'This is a public route' 
    };
  }

  /*
  * Ruta privada necesita token pero no valida roles
  */
  @Get('private-all-roles')
  @Auth()
  testingPrivateRoute( 
    @GetUser() user: User, // para acceder al user es necesario que sea privada porque el usuario se obtiene del token que se obtiene en el middleware de auth
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return { 
      ok: true, 
      message: 'This is a private route only for admin', 
      user, 
      headers 
    };
  }

  /*
  * Ruta privada necesita token y solo pueden acceder los que tienen rol admin y superAdmin
  */
  @Get('private-only-admin')
  @Auth( ValidRoles.admin, ValidRoles.superAdmin )
  tesPrivateRouteOnlyAdmin(
    @GetUser() user: User,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return { 
      ok: true, 
      message: 'This is a private route only for admin', 
      user, 
      headers 
    };
  }
}
```


### MAILERS
```bash
$ npm install @nestjs-modules/mailer nodemailer handlebars --workspace api
$ npm install --save-dev @types/nodemailer --workspace api
$ npm install --save @nestjs/config --workspace api
```

```.env

```



[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
