import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from './controllers/health-check.controller';
import { TrackingAnalyserController } from './controllers/tracking-analyser.controller';
import { TrackingAnalyserService } from './services/tracking-analyser.service';
import { NetworkCoverageService } from './external/network-coverage.service';
import { GhostPingGeneratorService } from './external/ghost-ping-generator.service';
import Configuration from './config/configuration';

@Module({
  imports: [
    HttpModule,

    // Configuration.
    ConfigModule.forRoot({
      load: [Configuration],
    }),

    // Health checks.
    TerminusModule,

    // Scheduler.
    ScheduleModule.forRoot(),
  ],
  controllers: [TrackingAnalyserController, HealthController],
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
    TrackingAnalyserService,

    // External services.
    NetworkCoverageService,
    GhostPingGeneratorService,
  ],
})
export class AppModule {}
