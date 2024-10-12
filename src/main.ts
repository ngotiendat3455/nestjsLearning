import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
/**
 * swagger config
 */

const config = new DocumentBuilder().setVersion('1.0').build();
// Instantiate Swagger
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}

bootstrap();
