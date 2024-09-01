import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import * as Joi from 'joi';

// import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './config/env.config';


@Module({
  imports: [
    // configuracion de las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ EnvConfiguration ], // Esta funcion se cargan las variables de entorno
      validationSchema: Joi.object({ // valida las variables de entorno con Joi
        DB_HOST: Joi.string().required(), // valida que la variable de entorno DB_HOST sea un string y sea requerida
        DB_DB: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(), // valida que la variable de entorno DB_PORT sea un número y sea requerida
        SECRET_KEY: Joi.string().required(),
        API_KEY: Joi.string().required(),
        GENERATOR_PHRASE: Joi.string().required(),
      }),
    }),

    // contenido estatico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client/dist'),
    }),

    // configuracion de la base de datos
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,      
      database: process.env.DB_DB,
      autoLoadEntities: true, // carga las entidades de forma automatica en el modulo de typeorm 
      synchronize: Boolean(Number(process.env.ORM_SYNCHRONIZE)), // sincroniza los cambios en los tipos de entidades, normalmente en produccion esta en false
    }),

    AuthModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
