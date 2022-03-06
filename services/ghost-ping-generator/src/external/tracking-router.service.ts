import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';

@Injectable()
export class TrackingRouterService {
  /**
   * The URL of the tracking router service.
   */
  private readonly serviceURL: string;

  /**
   * Constructs the tracking router service.
   * @param configService The configuration service.
   * @param httpService The HTTP client.
   */
  constructor(private readonly configService: ConfigService, private httpService: HttpService) {
    const host = configService.get<string>('trackingRouter.host');
    const port = configService.get<number>('trackingRouter.port');
    this.serviceURL = `http://${host}:${port}/tracking-router`;
  }

  /**
   * Returns the last position of a drone.
   * @param droneId The drone identifier.
   */
  public getDroneLastPosition(droneId: number): Promise<DroneHeartbeatDto> {
    return new Promise<DroneHeartbeatDto>((resolve) =>
      this.httpService
        .get<DroneHeartbeatDto>(`${this.serviceURL}/track/${droneId}`)
        .subscribe((response) => resolve(response.data)),
    );
  }
}
