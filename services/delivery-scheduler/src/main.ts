import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('port'));
}
bootstrap();
