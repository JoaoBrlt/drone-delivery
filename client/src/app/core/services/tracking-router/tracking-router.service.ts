import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { DroneHeartbeatDto } from '@core/dtos/drone-heartbeat.dto';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TrackingRouterService {
  /**
   * The tracking router service URL.
   */
  protected readonly serviceURL: string;

  /**
   * Constructs the tracking router service.
   * @param httpClient The HTTP client.
   */
  constructor(private readonly httpClient: HttpClient) {
    this.serviceURL = `http://${environment.trackingRouter.host}:${environment.trackingRouter.port}`;
  }

  /**
   * Returns the web socket of the tracking router service.
   */
  public getSocket(): Socket {
    return io(this.serviceURL);
  }

  /**
   * Returns the delivery path.
   * @param deliveryId The delivery identifier.
   */
  public getDeliveryPath(deliveryId: string): Observable<DroneHeartbeatDto[]> {
    return this.httpClient.get<DroneHeartbeatDto[]>(`${this.serviceURL}/tracking-router/delivery/${deliveryId}`);
  }
}
