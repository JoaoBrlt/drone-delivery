import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { WeatherAnalyserController } from './controllers/weather-analyser.controller';
import { WeatherAnalyserService } from './services/weather-analyser.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ProducerService } from './external/producer.service';
import { WeatherAPIService } from './external/weather-api.service';

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
    TypeOrmModule.forFeature([Weather]),
  ],
  controllers: [WeatherAnalyserController],
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
    WeatherAnalyserService,
    WeatherAPIService,
    ProducerService,
  ],
})
export class AppModule {}
