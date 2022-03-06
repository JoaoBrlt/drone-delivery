import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'socket.io-client';
import { DroneHeartbeatDto } from '@core/dtos/drone-heartbeat.dto';
import { TrackingRouterService } from '@core/services/tracking-router/tracking-router.service';
import { AlertRouterService } from '@core/services/alert-router/alert-router.service';
import { AlertDto } from '@core/dtos/alert.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AirTrafficAuthorityService } from '@core/services/air-traffic-authority/air-traffic-authority.service';
import { UrbanArea } from '@core/dtos/urban-area.dto';
import { NetworkCoverageService } from '@core/services/network-coverage/network-coverage.service';
import { CoverageArea } from '@core/dtos/coverage-area.dto';

@Component({
  selector: 'app-drone-tracking-page',
  templateUrl: './drone-tracking-page.component.html',
  styleUrls: ['./drone-tracking-page.component.scss']
})
export class DroneTrackingPageComponent implements OnInit, OnDestroy {
  /**
   * The web socket of the tracking router service.
   */
  private trackingRouterSocket: Socket;

  /**
   * The web socket of the alert router service.
   */
  private alertRouterSocket: Socket;

  /**
   * The last drone heartbeat of each drone.
   */
  private readonly droneHeartbeatsRecord: Record<number, DroneHeartbeatDto>;

  /**
   * The list of the last drone heartbeat of each drone.
   */
  public droneHeartbeats: DroneHeartbeatDto[];

  /**
   * The list of urban areas.
   */
  public urbanAreas: UrbanArea[];

  /**
   * The list of coverage areas.
   */
  public coverageAreas: CoverageArea[];

  /**
   * Constructs the drone tracking page component.
   * @param trackingRouterService The tracking router service.
   * @param alertRouterService The alert router service.
   * @param airTrafficAuthorityService The air traffic authority service.
   * @param networkCoverageService The network coverage service.
   * @param snackBar The Angular Material snack bar service.
   */
  constructor(
    private readonly trackingRouterService: TrackingRouterService,
    private readonly alertRouterService: AlertRouterService,
    private readonly airTrafficAuthorityService: AirTrafficAuthorityService,
    private readonly networkCoverageService: NetworkCoverageService,
    private readonly snackBar: MatSnackBar
  ) {
    this.droneHeartbeatsRecord = {};
    this.droneHeartbeats = [];
    this.urbanAreas = [];
    this.coverageAreas = [];
  }

  /**
   * Triggered when the drone tracking page component is initialized.
   */
  public ngOnInit(): void {
    this.trackingRouterSocket = this.trackingRouterService.getSocket();
    this.trackingRouterSocket.on('ping-emitted', (droneHeartbeat: DroneHeartbeatDto) => {
      if (droneHeartbeat) {
        this.droneHeartbeatsRecord[droneHeartbeat.droneId] = droneHeartbeat;
        this.droneHeartbeats = Object.values(this.droneHeartbeatsRecord);
        console.log('Heartbeat', droneHeartbeat);
      }
    });

    this.alertRouterSocket = this.alertRouterService.getSocket();
    this.alertRouterSocket.on('alert', (alert: AlertDto) => {
      this.snackBar.open(`Alert: Drone ${alert.droneId} - Delivery ${alert.deliveryId} - Status ${alert.status}`);
      console.log('Alert', alert);
    });

    this.airTrafficAuthorityService
      .getUrbanAreas()
      .subscribe((data: UrbanArea[]) => {
        this.urbanAreas = data;
        console.log('Urban areas', data);
      });

    this.networkCoverageService
      .getNetworkCoverageAreas()
      .subscribe((data: CoverageArea[]) => {
        this.coverageAreas = data;
        console.log('Coverage areas', data);
      });
  }

  /**
   * Triggered when the drone tracking page component is destroyed.
   */
  public ngOnDestroy(): void {
    this.trackingRouterSocket.disconnect();
    this.alertRouterSocket.disconnect();
  }
}
