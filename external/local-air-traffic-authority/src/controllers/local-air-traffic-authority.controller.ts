import { Body, Controller, Post } from '@nestjs/common';
import { AirTrafficReport } from '../dtos/air-traffic-report.dto';
import { LocalAirTrafficAuthorityService } from '../services/local-air-traffic-authority.service';

@Controller('local-air-traffic-authority')
export class LocalAirTrafficAuthorityController {
  /**
   * Constructs the local air traffic authority controller.
   * @param localAirTrafficAuthorityService The local air traffic authority service.
   */
  constructor(private readonly localAirTrafficAuthorityService: LocalAirTrafficAuthorityService) {}

  /**
   * Reports air traffic over the area monitored by the local air traffic authority.
   * @param report The air traffic report.
   */
  @Post()
  public reportAirTraffic(@Body() report: AirTrafficReport): void {
    this.localAirTrafficAuthorityService.logAirTraffic(report);
  }
}
