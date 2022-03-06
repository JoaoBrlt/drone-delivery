import { Body, Controller, Post } from '@nestjs/common';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';
import { DroneHeartbeatService } from '../services/drone-heartbeat.service';

@Controller('drone-heartbeat')
export class DroneHeartbeatController {
  /**
   * Constructs the drone heartbeat controller.
   * @param droneHeartbeatService The drone heartbeat service.
   */
  constructor(private readonly droneHeartbeatService: DroneHeartbeatService) {}

  /**
   * Stores and forwards a drone heartbeat.
   * @param heartbeat The received drone heartbeat.
   */
  @Post('send')
  public async handleDroneHeartbeat(@Body() heartbeat: DroneHeartbeatDto): Promise<void> {
    console.log('Heartbeat');
    this.droneHeartbeatService.forwardDroneHeartbeat(heartbeat);
    await this.droneHeartbeatService.storeDroneHeartbeat(heartbeat);
  }

  /**
   * Stops the service.
   */
  @Post('crash')
  public async crash(): Promise<void> {
    console.error('Manual crash');
    process.exit(1);
  }
}
