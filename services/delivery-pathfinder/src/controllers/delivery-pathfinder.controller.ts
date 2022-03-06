import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { DroneAssignedDto } from '../dtos/drone-assigned.dto';
import { DroneScheduledDto } from '../dtos/drone-scheduled.dto';
import { DeliveryPathfinderService } from '../services/delivery-pathfinder.service';
import { AlertDto, AlertStatus } from '../dtos/alert.dto';

@Controller('delivery-pathfinder')
export class DeliveryPathfinderController {
  /**
   * Constructs the delivery pathfinder controller.
   * @param kafkaClient The Kafka client.
   * @param deliveryPathfinderService The delivery pathfinder service.
   */
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
    private readonly deliveryPathfinderService: DeliveryPathfinderService,
  ) {}

  /**
   * Triggered when a drone assigned event is received.
   * @param data The received drone assigned event.
   */
  @EventPattern('drone-assigned')
  public onDroneAssignedEvent(data: { value: DroneAssignedDto }): void {
    const inputEvent: DroneAssignedDto = data.value;

    // Compute the delivery path.
    const sourcePoint = { latitude: 43.70064, longitude: 7.26728, altitude: 0 };
    const destinationPoint = this.deliveryPathfinderService.geocode(inputEvent.destination);
    const path = this.deliveryPathfinderService.computePath(sourcePoint, destinationPoint);

    // Build the drone scheduled event.
    const outputEvent: DroneScheduledDto = {
      droneId: inputEvent.droneId,
      deliveryId: inputEvent.deliveryId,
      destination: inputEvent.destination,
      path,
      date: inputEvent.date,
    };

    // Emit the drone scheduled event.
    this.kafkaClient.emit('drone-scheduled', { ...outputEvent });
  }

  /**
   * Consumes an alert event of a drone, then check the alert status and do the according behavior
   * @param data the kafka message; his value is of type AlertDto
   */
  @EventPattern('alert')
  public async reactAlertComputeNewPath(data: { value: AlertDto }): Promise<void> {
    const alert: AlertDto = data.value; // Shortcut.

    // Different behavior according to the type of alert
    // N.B : Validation of enum values is done at entry point (alert-handler service), we don't need to do it here
    if (alert.status === AlertStatus.FAILURE) {
      DeliveryPathfinderController.alertFailure(alert);
    } else if (alert.status === AlertStatus.LOST) {
      this.alertComputeNewPath(alert);
    }
  }

  /**
   * Behavior of the drone when he is lost
   * Compute the new path of the drone based on his current location
   *  Then send the newest path to the registry via the bus, topic 'drone-scheduled'
   *  So the drone can retrieve his new path to follow
   * @param alert the alert object
   */
  private alertComputeNewPath(alert: AlertDto) {
    // Compute the NEW delivery path.
    const path = this.deliveryPathfinderService.computePath(alert.currentPoint, alert.destinationPoint);

    // Build the drone scheduled event.
    const outputEvent: DroneScheduledDto = {
      droneId: alert.droneId,
      deliveryId: alert.deliveryId,
      destination: alert.destinationText,
      path,
      date: alert.date,
    };

    // Emit the event to the bus.
    this.kafkaClient.emit('drone-scheduled', { ...outputEvent });
  }

  /**
   * Behavior of the drone when he has a hardware failure
   *        - NOT YET IMPLEMENTED -
   * @param alert the alert object
   */
  private static alertFailure(alert: AlertDto) {
    const point: string =
      '\nLatitude : ' +
      alert.currentPoint.latitude +
      '\nLongitude : ' +
      alert.currentPoint.longitude +
      '\nAltitude : ' +
      alert.currentPoint.altitude;
    console.log('\nHardware Failure ! Last known position: ' + point);
  }
}
