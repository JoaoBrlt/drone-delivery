import { logger } from '../utilities/logger';
import axios from 'axios';
import { Coordinates } from '../dtos/coordinates.dto';
import { CoverageResponseDto } from '../dtos/coverage-response.dto';

export class NetworkCoverageApi {
  /**
   * Returns the service URL.
   */
  public static getServiceURL(): string {
    return `http://${process.env.NETWORK_COVERAGE_API_HOST}:${process.env.NETWORK_COVERAGE_API_PORT}/network-coverage`;
  }

  /**
   * Returns the network coverage of a specific location.
   * @param coordinates The geographical coordinates.
   */
  public static async getNetworkCoverage(coordinates: Coordinates): Promise<CoverageResponseDto> {
    logger.log('http', `GET ${this.getServiceURL()}/by-coordinates?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);
    const response = await axios.get<CoverageResponseDto>(
      `${this.getServiceURL()}/by-coordinates?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`
    );
    return response.data as CoverageResponseDto;
  }
}
