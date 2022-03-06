import { Injectable, Logger } from '@nestjs/common';
import { AirTrafficReport } from '../dtos/air-traffic-report.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalAirTrafficAuthorityService {
  /**
   * The class logger.
   */
  private readonly logger = new Logger(LocalAirTrafficAuthorityService.name);

  /**
   * The name of the local air traffic authority.
   */
  private readonly name: string;

  /**
   * Constructs the local air traffic authority service.
   * @param configService The configuration service.
   */
  constructor(private readonly configService: ConfigService) {
    this.name = this.configService.get('name');
  }

  /**
   * Logs the air traffic report.
   * @param report The air traffic report.
   */
  public logAirTraffic(report: AirTrafficReport): void {
    this.logger.log(
      `[${this.name}] ${report.type} - ${report.owner} - ${report.identifier} - ` +
        `${report.coordinates.latitude}°, ${report.coordinates.longitude}°, ${report.coordinates.altitude}m`,
    );
  }
}
