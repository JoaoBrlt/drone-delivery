import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AlertDto } from '../dtos/alert.dto';
import { WebsocketService } from '../websockets/websocket.service';

@Controller('alert-router')
export class AppController {
  /**
   * Constructs the alert router controller.
   * @param websocketService The websocket service.
   */
  constructor(private readonly websocketService: WebsocketService) {}

  /**
   * Triggered when an alert event is received.
   * @param data The received alert event.
   */
  @EventPattern('alert')
  public onDroneHeartbeatEvent(data: { value: AlertDto }) {
    this.websocketService.broadcastAlert(data.value);
  }
}
