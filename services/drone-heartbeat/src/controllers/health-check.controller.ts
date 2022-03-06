import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { HealthCheck, HealthCheckService, MicroserviceHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('drone-heartbeat/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private database: TypeOrmHealthIndicator,
    @InjectConnection()
    private connection: Connection,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  public check() {
    return this.health.check([
      () => this.database.pingCheck('database', { connection: this.connection }),
      () => this.microservice.pingCheck('kafka', { ...this.configService.get('kafka'), timeout: 10000 }),
    ]);
  }
}
