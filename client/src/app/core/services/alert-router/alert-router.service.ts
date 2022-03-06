import { Injectable } from '@angular/core';
import { environment } from '@env';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AlertRouterService {
  /**
   * The alert router service URL.
   */
  protected readonly serviceURL: string;

  /**
   * Constructs the alert router service.
   */
  constructor() {
    this.serviceURL = `http://${environment.alertRouter.host}:${environment.alertRouter.port}`;
  }

  /**
   * Returns the web socket of the alert router service.
   */
  public getSocket(): Socket {
    return io(this.serviceURL);
  }
}
