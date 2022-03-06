import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';

@Injectable()
export class GhostPingGeneratorService {
  /**
   * The URL of the ghost ping generator service.
   */
  private readonly serviceURL: string;

  /**
   * Constructs the ghost ping generator service.
   * @param configService The configuration service.
   * @param httpService The HTTP client.
   */
  constructor(private readonly configService: ConfigService, private httpService: HttpService) {
    const host = configService.get<string>('ghost_ping_generator.host');
    const port = configService.get<number>('ghost_ping_generator.port');
    this.serviceURL = `http://${host}:${port}/ghost-ping-generator`;
  }

  public async requestGhostPing(droneId: number): Promise<DroneHeartbeatDto> {
    return new Promise<DroneHeartbeatDto>((resolve) =>
      this.httpService
        .get<DroneHeartbeatDto>(`${this.serviceURL}/${droneId}/ghost-ping`)
        .subscribe((response) => resolve(response.data)),
    );
  }
}
