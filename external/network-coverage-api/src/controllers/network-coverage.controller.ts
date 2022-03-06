import { Controller, Get, Query } from '@nestjs/common';
import { NetworkCoverageService } from '../services/network-coverage.service';
import { CoverageArea } from '../dtos/coverage-area.dto';
import { CoverageResponseDto } from '../dtos/coverage-response.dto';
import { Coordinates } from '../dtos/coordinates.dto';

@Controller('network-coverage')
export class NetworkCoverageController {
  /**
   * Constructs the network coverage controller.
   * @param coverageService The network coverage service.
   */
  constructor(private readonly coverageService: NetworkCoverageService) {}

  /**
   * Returns all the network coverage areas.
   * This request is used only for displaying areas on the map.
   */
  @Get()
  public getNetworkCoverageAreas(): CoverageArea[] {
    return this.coverageService.getNetworkCoverageAreas();
  }

  /**
   * Returns the network coverage of a specific location.
   * @param coordinates The geographical coordinates.
   */
  @Get('by-coordinates')
  public getNetworkCoverage(@Query() coordinates: Coordinates): CoverageResponseDto {
    return this.coverageService.getNetworkCoverage(coordinates);
  }
}
