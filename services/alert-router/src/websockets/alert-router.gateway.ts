import {
  MessageBody,
  WebSocketGateway,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebsocketService } from './websocket.service';

@WebSocketGateway({ cors: true })
export class AlertRouterGateway implements OnGatewayInit {
  /**
   * The websocket server.
   */
  @WebSocketServer()
  private server: Server;

  /**
   * Constructs the alert router websocket gateway.
   * @param websocketService The websocket service.
   */
  constructor(private websocketService: WebsocketService) {}

  /**
   * Initializes the alert router websocket gateway.
   * @param server The initialized websocket server.
   */
  public afterInit(server: Server): void {
    this.websocketService.setServer(server);
  }

  /**
   * Tests the websocket connection.
   * @param data The received websocket event.
   */
  @SubscribeMessage('test')
  public onTestEvent(@MessageBody() data: any): string {
    return 'ok';
  }
}
