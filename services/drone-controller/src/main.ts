import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Initialize the service.
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  // Connect to Kafka.
  app.connectMicroservice(configService.get('kafka'));

  // Start the service.
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('port'));
}
bootstrap();