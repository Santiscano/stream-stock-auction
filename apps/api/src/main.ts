import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({ // esta clase es un interceptor que permite validar los datos de entrada de las peticiones HTTP según las reglas definidas en los DTOs (Data Transfer Object)
      whitelist: true, // elimina las propiedades que no están definidas en el DTO (Data Transfer Object)
      forbidNonWhitelisted: true, // evita que se envíen propiedades que no están definidas en el DTO, generando un error 400
      transformOptions: {
        // convierte automáticamente los tipos de datos de las propiedades del DTO a los tipos de datos especificados en el DTO, por ejemplo, si se envía un string en un campo que debería ser de tipo number, lo convierte automáticamente a number y no genera un error de validación.
        enableImplicitConversion: true, // por ejemplo cuando tengo un objeto Query que internamente tiene varios, por ejemplo en el caso de productos con el limit y offset, si se envía un string en un campo que debería ser de tipo number, lo convierte automáticamente a number y no genera un error de validación.
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Nombre proyecto REST API')
    .setDescription('Descripcion de documentacion swagger')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT);
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
