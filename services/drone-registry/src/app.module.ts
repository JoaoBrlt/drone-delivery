import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DroneRegistryController } from './controllers/drone-registry.controller';
import { DroneRegistryService } from './services/drone-registry.service';
import { Delivery } from './entities/delivery.entity';
import { HealthController } from './controllers/health-check.controller';
import { Path } from './entities/path.entity';
import { GeoPoint } from './entities/geopoint.entity';
import Configuration from './config/configuration';

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
    TypeOrmModule.forFeature([Delivery, Path, GeoPoint]),

    // Health checks.
    TerminusModule,
  ],
  controllers: [DroneRegistryController, HealthController],
  providers: [
    // Kafka.
    {
      provide: 'KAFKA_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('kafka'));
      },
    },

    // Services
    DroneRegistryService,
  ],
})
export class AppModule {}
