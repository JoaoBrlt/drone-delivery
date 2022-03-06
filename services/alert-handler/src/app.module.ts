import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ProducerService } from './external/producer.service';
import { AlertHandlerController } from './controllers/alert-handler.controller';
import { HealthController } from './controllers/health-check.controller';
import Configuration from './config/configuration';

@Module({
  imports: [
    // Configuration.
    ConfigModule.forRoot({
      load: [Configuration],
    }),

    // Health checks.
    TerminusModule,
  ],
  controllers: [
    // Controllers.
    AlertHandlerController,
    HealthController,
  ],
  providers: [
    // Kafka.
    {
      provide: 'KAFKA_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('kafka'));
      },
    },

    // Services.
    ProducerService,
  ],
})
export class AppModule {}
