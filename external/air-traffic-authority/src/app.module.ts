import { Module } from '@nestjs/common';
import { AirTrafficAuthorityController } from './controllers/air-traffic-authority.controller';
import { AirTrafficAuthorityService } from './services/air-traffic-authority.service';
import { ConfigModule } from '@nestjs/config';
import Configuration from './config/configuration';

@Module({
  imports: [
    // Configuration.
    ConfigModule.forRoot({
      load: [Configuration],
    }),
  ],
  controllers: [AirTrafficAuthorityController],
  providers: [AirTrafficAuthorityService],
})
export class AppModule {}
