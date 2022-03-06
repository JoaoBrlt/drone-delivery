import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DroneControllerController } from './controllers/drone-controller.controller';
import { DroneControllerService } from './services/drone-controller.service';
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
    DroneControllerController,
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
    DroneControllerService,
  ],
})
export class AppModule {}
