import { Module } from '@nestjs/common';
import { GhostPingGeneratorController } from './controllers/ghost-ping-generator.controller';
import { GhostPingGeneratorService } from './services/ghost-ping-generator.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config/configuration';
import { ClientProxyFactory } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneRegistryService } from './external/drone-registry.service';
import { TrackingRouterService } from './external/tracking-router.service';

@Module({
  imports: [
    HttpModule,

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
    TypeOrmModule.forFeature([]),
  ],
  controllers: [GhostPingGeneratorController],
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
    GhostPingGeneratorService,

    // External services.
    DroneRegistryService,
    TrackingRouterService,
  ],
})
export class AppModule {}
