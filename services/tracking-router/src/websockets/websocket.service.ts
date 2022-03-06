import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';

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
   * Broadcasts a drone heartbeat event through the websocket.
   * @param heartbeat The drone heartbeat event to be broadcast.
   */
  public broadcastDroneHeartbeat(heartbeat: DroneHeartbeatDto) {
    if (this.server) {
      this.server.emit('ping-emitted', heartbeat);
    }
  }
}
