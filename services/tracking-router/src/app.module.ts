import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DroneHeartbeat } from './entities/drone-heartbeat.entity';
import { CacheService } from './services/cache.service';
import { TrackingRouterController } from './controllers/tracking-router.controller';
import { TrackingRouterService } from './services/tracking-router.service';
import { TrackingRouterGateway } from './websockets/tracking-router.gateway';
import { WebsocketService } from './websockets/websocket.service';
import { HealthController } from './controllers/health-check.controller';
import Configuration from './config/configuration';

@Module({
  imports: [
    // Configuration.
    ConfigModule.forRoot({
      load: [Configuration],
    }),

    // Database.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('database'),
    }),

    // Repositories.
    TypeOrmModule.forFeature([DroneHeartbeat]),

    // Health checks.
    TerminusModule,
  ],
  controllers: [
    // Controllers.
    TrackingRouterController,
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

    // Gateways.
    TrackingRouterGateway,

    // Services.
    TrackingRouterService,
    WebsocketService,
    CacheService,
  ],
})
export class AppModule {}
