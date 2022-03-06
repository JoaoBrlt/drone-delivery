import { Module } from '@nestjs/common';
import Configuration from './config/configuration';
import { NetworkCoverageController } from './controllers/network-coverage.controller';
import { NetworkCoverageService } from './services/network-coverage.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Configuration.
    ConfigModule.forRoot({
      load: [Configuration],
    }),
  ],
  controllers: [NetworkCoverageController],
  providers: [
    // Services.
    NetworkCoverageService,
  ],
})
export class AppModule {}
