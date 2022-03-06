import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { DateTime } from 'luxon';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';
import { TrackingRouterService } from '../services/tracking-router.service';
import { WebsocketService } from '../websockets/websocket.service';
import { DroneHeartbeat } from '../entities/drone-heartbeat.entity';

@Controller('tracking-router')
export class TrackingRouterController {
  /**
   * Constructs the tracking router controller.
   * @param trackingRouterService The tracking router service.
   * @param websocketService The websocket service.
   */
  constructor(
    private readonly trackingRouterService: TrackingRouterService,
    private readonly websocketService: WebsocketService,
  ) {}

  /**
   * Triggered when a drone heartbeat event is received.
   * @param data The received drone heartbeat event.
   */
  @EventPattern('ping-emitted')
  public onDroneHeartbeatEvent(data: { value: DroneHeartbeatDto }) {
    this.websocketService.broadcastDroneHeartbeat(data.value);
    return this.trackingRouterService.updateDronePosition(data.value);
  }

  /**
   * Returns the last position of a drone.
   * @param droneId The drone identifier.
   */
  @Get('track/:id')
  public getDroneLastPosition(@Param('id') droneId: number): Promise<DroneHeartbeat> {
    const date = DateTime.now();
    return this.trackingRouterService.trackDrone(droneId, date);
  }

  /**
   * Returns the last position of all the drones.
   */
  @Get('displayDrones')
  public displayDronePosition(): Promise<DroneHeartbeatDto[]> {
    return this.trackingRouterService.getAllDronePosition();
  }

  /**
   * Returns the route a drone flew over.
   */
  @Get('route/:id')
  public displayDroneRoute(@Param('id') droneId: number): Promise<DroneHeartbeat[]> {
    return this.trackingRouterService.getDroneRoute(droneId);
  }

  /**
   * Returns the route progress a drone has made for a delivery
   */
  @Get('delivery/:id')
  public displayDeliveryProgression(@Param('id') deliveryId: string): Promise<DroneHeartbeat[]> {
    return this.trackingRouterService.getDeliveryProgression(deliveryId);
  }
}
