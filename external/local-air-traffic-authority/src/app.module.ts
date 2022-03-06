import { Module } from '@nestjs/common';
import { LocalAirTrafficAuthorityController } from './controllers/local-air-traffic-authority.controller';
import { LocalAirTrafficAuthorityService } from './services/local-air-traffic-authority.service';
import { ConfigModule } from '@nestjs/config';
import Configuration from './config/configuration';

@Module({
  imports: [
    // Configuration.
    ConfigModule.forRoot({
      load: [Configuration],
    }),
  ],
  controllers: [LocalAirTrafficAuthorityController],
  providers: [LocalAirTrafficAuthorityService],
})
export class AppModule {}
