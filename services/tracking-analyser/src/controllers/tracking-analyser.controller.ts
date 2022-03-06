import { Body, Controller, Post } from '@nestjs/common';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';
import { TrackingAnalyserService } from '../services/tracking-analyser.service';
import { EventPattern } from '@nestjs/microservices';
import { TestDto } from '../dtos/test.dto';
import { DroneStatus } from '../types/drone-status.type';

@Controller('tracking-analyser')
export class TrackingAnalyserController {
  /**
   * Constructs the tracking analyser controller.
   * @param trackingAnalyserService The tracking analyser service.
   */
  constructor(private readonly trackingAnalyserService: TrackingAnalyserService) {}

  /**
   * Triggered when a drone heartbeat event is received.
   * @param data The received drone heartbeat event.
   */
  @EventPattern('ping-emitted')
  public onDroneHeartbeatEvent(data: { value: DroneHeartbeatDto }) {
    if (data.value.status != DroneStatus.NO_SIGNAL)
      //Do NOT reset the routine if the ping is a ghost-ping
      this.trackingAnalyserService.resetRoutine(data.value.droneId);
  }

  /**
   * Initialise tracking routines for the drones already flying.
   */
  @EventPattern('flying-drones')
  public async initTracking(data: { value: number[] }): Promise<void> {
    this.trackingAnalyserService.startTrackingForMultiplesDrones(data.value);
  }

  /**
   * Initialise tracking routines for the drones already flying.
   */
  @EventPattern('delivery-started')
  public async startTracking(data: { value: number }): Promise<void> {
    this.trackingAnalyserService.startTracking(data.value);
  }

  /**
   * Initialise tracking routines for the drones already flying.
   */
  @EventPattern('delivery-done')
  public async endTracking(data: { value: number }): Promise<void> {
    this.trackingAnalyserService.endTracking(data.value);
  }

  @Post('config-test')
  public reset(@Body() params: TestDto): void {
    if (params.reset) this.trackingAnalyserService.clearAll();
    if (params.counterLimit) this.trackingAnalyserService.setCounterLimit(params.counterLimit);
    if (params.timeout) this.trackingAnalyserService.setTimeout(params.timeout);
  }
}
