import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { PathDto } from '../dtos/path.dto';

@Injectable()
export class DroneRegistryService {
  /**
   * The URL of the drone registry service.
   */
  private readonly serviceURL: string;

  /**
   * Constructs the drone registry service.
   * @param configService The configuration service.
   * @param httpService The HTTP client.
   */
  constructor(private readonly configService: ConfigService, private httpService: HttpService) {
    const host = configService.get<string>('droneRegistry.host');
    const port = configService.get<number>('droneRegistry.port');
    this.serviceURL = `http://${host}:${port}/drone-registry`;
  }

  /**
   * Returns the path of a drone.
   * @param droneId The drone identifier.
   */
  public async getDronePath(droneId: number): Promise<PathDto> {
    return new Promise<PathDto>((resolve) =>
      this.httpService
        .get<PathDto>(`${this.serviceURL}/${droneId}/path`)
        .subscribe((response) => resolve(response.data)),
    );
  }
}
