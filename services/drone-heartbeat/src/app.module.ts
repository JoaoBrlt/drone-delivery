import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneHeartbeatController } from './controllers/drone-heartbeat.controller';
import { DroneHeartbeatService } from './services/drone-heartbeat.service';
import { DroneHeartbeat } from './entities/drone-heartbeat.entity';
import Configuration from './config/configuration';
import { ClientProxyFactory } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health-check.controller';

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
    DroneHeartbeatController,
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
    DroneHeartbeatService,
  ],
})
export class AppModule {}
