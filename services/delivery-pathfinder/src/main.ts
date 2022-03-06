import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Initialize the service.
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable the validation.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Connect to Kafka.
  app.connectMicroservice(configService.get('kafka'));

  // Start the service.
  await app.init();
  await app.startAllMicroservices();
}
bootstrap();
