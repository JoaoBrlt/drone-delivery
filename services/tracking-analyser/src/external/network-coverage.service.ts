import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoverageResponseDto } from '../dtos/coverage-response.dto';
import { HttpService } from '@nestjs/axios';
import { Coordinates } from '../dtos/coordinates.dto';

@Injectable()
export class NetworkCoverageService {
  /**
   * The URL of the network coverage service.
   */
  private readonly serviceURL: string;

  /**
   * Constructs the network coverage service.
   * @param configService The configuration service.
   * @param httpService The HTTP client.
   */
  constructor(private readonly configService: ConfigService, private httpService: HttpService) {
    const host = configService.get<string>('network_coverage_api.host');
    const port = configService.get<number>('network_coverage_api.port');
    this.serviceURL = `http://${host}:${port}/network-coverage`;
  }

  /**
   * Returns the network coverage of a specific location.
   * @param coordinates The geographical coordinates.
   */
  public async getNetworkCoverage(coordinates: Coordinates): Promise<CoverageResponseDto> {
    return new Promise<CoverageResponseDto>((resolve) =>
      this.httpService
        .get<CoverageResponseDto>(
          `${this.serviceURL}/by-coordinates?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`,
        )
        .subscribe((response) => resolve(response.data)),
    );
  }
}
