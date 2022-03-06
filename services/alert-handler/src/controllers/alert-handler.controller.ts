import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlertDto } from '../dtos/alert.dto';
import { ProducerService } from '../external/producer.service';
import { GeoPoint } from '../dtos/geo-point.dto';
import { AlertStatus } from '../dtos/alert-status.dto';

@Controller('alert')
export class AlertHandlerController {
  /**
   * Constructs the alert handler controller.
   * @param producerService The producer service.
   */
  constructor(private readonly producerService: ProducerService) {}

  /**
   * Emit a new alert to the bus (topic 'alert')
   * Route used by the drone to signal a problem during its delivery
   *  =>Asking the pathfinder to compute him a new route based on his current location
   * @param request the alert dto (format validated by the pipes+dto)
   */
  @Post()
  public async sendAlert(@Body() request: AlertDto) {
    request.date = new Date(); //Date of the alert can ONLY be equal to the most recent time == now()
    this.producerService.emitAlert(request);
  }

  /**
   * Produces a dummy event to check if the service is working properly.
   * Hypothesis: This method will ONLY be used for debugging purposes.
   */
  @Get('/kafka')
  public async testProduce() {
    const alert: AlertDto = {
      droneId: 1,
      deliveryId: 'DE-7KC7J',
      currentPoint: {
        latitude: 12,
        longitude: 5.64,
        altitude: 2.967,
      } as GeoPoint,
      destinationText: 'Nice',
      destinationPoint: {
        latitude: -45.0,
        longitude: 1.1,
        altitude: 5,
      } as GeoPoint,
      status: AlertStatus.LOST,
      date: new Date(),
    };
    this.producerService.emitAlert(alert);
  }
}
