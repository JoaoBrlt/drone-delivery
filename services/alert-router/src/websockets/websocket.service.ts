import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { AlertDto } from '../dtos/alert.dto';

@Injectable()
export class WebsocketService {
  /**
   * The websocket server.
   */
  private server: Server;

  /**
   * Constructs the websocket service.
   */
  constructor() {
    this.server = null;
  }

  /**
   * Sets the websocket server.
   * @param server The websocket server.
   */
  public setServer(server: Server): void {
    this.server = server;
  }

  /**
   * Broadcasts an alert event through the websocket.
   * @param alert The alert event to be broadcast.
   */
  public broadcastAlert(alert: AlertDto) {
    if (this.server) {
      this.server.emit('alert', alert);
    }
  }
}
