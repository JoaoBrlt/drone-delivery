import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './controllers/alert-router.controller';
import { AlertRouterGateway } from './websockets/alert-router.gateway';
import { WebsocketService } from './websockets/websocket.service';
import Configuration from './config/configuration';

@Module({
  imports: [
    // Configuration.
    ConfigModule.forRoot({
      load: [Configuration],
    }),
  ],
  controllers: [AppController],
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
    AlertRouterGateway,

    // Services.
    WebsocketService,
  ],
})
export class AppModule {}
