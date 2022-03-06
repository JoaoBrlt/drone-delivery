import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchedulerController } from './controllers/scheduler.controller';
import { SchedulerService } from './services/scheduler.service';
import { Scheduling } from './entities/scheduling.entity';
import { ProducerService } from './external/producer.service';
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
    TypeOrmModule.forFeature([Scheduling]),

    // Health checks.
    TerminusModule,
  ],
  controllers: [
    // Controllers.
    SchedulerController,
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
    SchedulerService,
    ProducerService,
  ],
})
export class AppModule {}
