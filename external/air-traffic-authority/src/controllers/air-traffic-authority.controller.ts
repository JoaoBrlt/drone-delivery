import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { AirTrafficAuthorityService } from '../services/air-traffic-authority.service';
import { Coordinates } from '../dtos/coordinates.dto';
import { UrbanArea } from '../dtos/urban-area.dto';

@Controller('air-traffic-authority')
export class AirTrafficAuthorityController {
  /**
   * Constructs the air traffic authority controller.
   * @param airTrafficAuthorityService The air traffic authority controller.
   */
  constructor(private readonly airTrafficAuthorityService: AirTrafficAuthorityService) {}

  /**
   * Returns all known urban areas.
   */
  @Get()
  public getUrbanAreas(): UrbanArea[] {
    return this.airTrafficAuthorityService.getUrbanAreas();
  }

  /**
   * Finds the urban area corresponding to given geographical coordinates.
   * @param coordinates The geographical coordinates.
   */
  @Get('by-coordinates')
  public findUrbanAreaByCoordinates(@Query() coordinates: Coordinates): UrbanArea {
    const urbanArea = this.airTrafficAuthorityService.findUrbanAreaByCoordinates(coordinates);
    if (!urbanArea) {
      throw new NotFoundException('This position does not correspond to any known urban area.');
    }
    return urbanArea;
  }
}
