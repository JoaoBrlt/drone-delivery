import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GhostPingGeneratorService } from '../services/ghost-ping-generator.service';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';

@Controller('ghost-ping-generator')
export class GhostPingGeneratorController {
  /**
   * Constructs the ghost ping generator controller.
   * @param ghostPingGeneratorService The ghost ping generator service.
   */
  constructor(private readonly ghostPingGeneratorService: GhostPingGeneratorService) {}

  /**
   * Generates a ghost ping for a specific drone.
   * @param droneId The drone identifier.
   */
  @Get('/:droneId/ghost-ping')
  public generateGhostPing(@Param('droneId', ParseIntPipe) droneId: number): Promise<DroneHeartbeatDto> {
    console.log('Drone ID in GhostPing : ', droneId);
    return this.ghostPingGeneratorService.generateGhostPing(droneId);
  }
}
