import { HealthCheck, HealthCheckService, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('alert/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  public check() {
    return this.health.check([
      () => this.microservice.pingCheck('kafka', { ...this.configService.get('kafka'), timeout: 10000 }),
    ]);
  }
}
