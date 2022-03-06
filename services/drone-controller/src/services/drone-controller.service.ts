import { Injectable } from '@nestjs/common';
import { DeliveryDto } from '../dtos/delivery.dto';

@Injectable()
export class DroneControllerService {
  private attribution: { [droneId: number]: DeliveryDto } = {};

  /**
   * Sends the delivery to the drone of id droneId.
   * @param delivery the delivery.
   */
  public attribute(delivery: DeliveryDto) {
    this.attribution[delivery.droneId] = delivery;
    console.log('Order', delivery, 'sent to drone of id', delivery.droneId);
  }

  /**
   * Get the last delivery attributed to the given drone
   * @param droneId
   */
  public getLastAttribution(droneId: number): DeliveryDto {
    return this.attribution[droneId];
  }
}
