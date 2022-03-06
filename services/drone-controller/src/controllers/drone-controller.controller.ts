import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { DeliveryDto } from '../dtos/delivery.dto';
import { DroneControllerService } from '../services/drone-controller.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('drone-controller')
export class DroneControllerController {
  /**
   * Constructs the drone controller controller.
   * @param droneControllerService the drone controller service.
   */
  constructor(private readonly droneControllerService: DroneControllerService) {}

  /**
   * Sends the delivery to the drone of id droneId.
   * @param data the received data containing the delivery
   */
  @EventPattern('drone-scheduled')
  public attribute(data: { value: DeliveryDto }): void {
    this.droneControllerService.attribute(data.value);
  }

  /**
   * Get the delivery attributed to the given drone
   * @param droneId
   */
  @Get('/attribution/:droneId')
  public getAttribution(@Param('droneId') droneId: number): DeliveryDto {
    return this.droneControllerService.getLastAttribution(droneId);
  }

  /**
   * Sends the delivery to the drone of id droneId.
   * Used ONLY for testing purposes
   * @param delivery the delivery.
   */
  @Post('/attribute')
  public attributeTestRoute(@Body() delivery: DeliveryDto): void {
    this.droneControllerService.attribute(delivery);
  }
}
