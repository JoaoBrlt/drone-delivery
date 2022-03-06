import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DeliveryPathfinderController } from './controllers/delivery-pathfinder.controller';
import { DeliveryPathfinderService } from './services/delivery-pathfinder.service';
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
    DeliveryPathfinderController,
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
    DeliveryPathfinderService,
  ],
})
export class AppModule {}
