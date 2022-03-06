import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DroneRegistryService } from '../services/drone-registry.service';
import { EventPattern } from '@nestjs/microservices';
import { DeliveryDto } from '../dtos/delivery.dto';
import { DeliveryStatus } from '../entities/delivery.entity';

@Controller('drone-registry')
export class DroneRegistryController {
  /**
   * Constructs the drone registry controller.
   * @param droneRegistryService The drone registry service.
   */
  constructor(private readonly droneRegistryService: DroneRegistryService) {}

  /**
   * Sends the assigned delivery to the concerned drone
   * and save it to the database.
   * @param data the message containing the delivery.
   */
  @EventPattern('drone-scheduled')
  public async droneScheduled(data: { value: DeliveryDto }): Promise<void> {
    await this.droneRegistryService.droneScheduled(data.value);
  }

  /**
   * Set the drone of id droneId ready to assign it a delivery with a path to follow.
   * @param droneId the id of the ready drone.
   */
  @Post('/:droneId/ready')
  public async setReady(@Param('droneId', ParseIntPipe) droneId: number): Promise<void> {
    this.droneRegistryService.setReady(droneId);
  }

  /**
   * Set the delivery of the drone of id droneId completed.
   * @param droneId the id of the done drone.
   */
  @Post('/:droneId/done')
  public async setDone(@Param('droneId', ParseIntPipe) droneId: number): Promise<void> {
    await this.droneRegistryService.setDone(droneId);
  }

  /**
   * Get a delivery status.
   * @param deliveryId the id of the delivery.
   */
  @Get('/:deliveryId/status')
  public async getDeliveryStatus(@Param('deliveryId', ParseIntPipe) deliveryId: number): Promise<DeliveryStatus> {
    return this.droneRegistryService.getDeliveryStatus(deliveryId);
  }

  /**
   * Get a list of drone id for which the drone status corresponds to the given one.
   * @param status the status of the drones.
   */
  @Get('/status/:status')
  public async getDroneIdsByStatus(@Param('status') status: DeliveryStatus): Promise<number[]> {
    return this.droneRegistryService.getDroneIdsByStatus(status);
  }

  /**
   * Sends the list of drone id for each in progress delivery
   */
  @EventPattern('tracking-ready')
  public async trackingReady(): Promise<void> {
    await this.droneRegistryService.trackingReady();
  }

  @Get('/:droneId/path')
  public async getDronePath(@Param('droneId', ParseIntPipe) droneId: number) {
    console.log('inside drone registry ');
    return await this.droneRegistryService.getDronePath(droneId);
  }
}
