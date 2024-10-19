import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
/**
 * swagger config
 */

const swaggerConfig  = new DocumentBuilder().setVersion('1.0').build();
// Instantiate Swagger
const document = SwaggerModule.createDocument(app, swaggerConfig);
SwaggerModule.setup('api', app, document)

/*
   * Setup AWS SDK used for uploadingg files to AWS S3
   * */
// const configService = app.get(ConfigService);
//   config.update({
//     credentials: {
//       accessKeyId: configService.get<string>('appConfig.awsAccessKeyId'),
//       secretAccessKey: configService.get<string>(
//         'appConfig.awsSecretAccessKey',
//       ),
//     },
//     region: configService.get<string>('appConfig.awsRegion'),
//   });
  await app.listen(3000);
}

bootstrap();
