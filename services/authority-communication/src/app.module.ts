import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorityCommunicationController } from './controllers/authority-communication.controller';
import Configuration from './config/configuration';

@Module({
  imports: [
    HttpModule,

    // Configuration.
    ConfigModule.forRoot({
      load: [Configuration],
    }),
  ],
  controllers: [AuthorityCommunicationController],
  providers: [
    // Kafka.
    {
      provide: 'KAFKA_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('kafka'));
      },
    },
  ],
})
export class AppModule {}
