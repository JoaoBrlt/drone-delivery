import { Component, OnInit } from '@angular/core';
import { DroneHeartbeatDto } from '@core/dtos/drone-heartbeat.dto';
import { TrackingRouterService } from '@core/services/tracking-router/tracking-router.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-delivery-tracking-page',
  templateUrl: './delivery-tracking-page.component.html',
  styleUrls: ['./delivery-tracking-page.component.scss']
})
export class DeliveryTrackingPageComponent implements OnInit {
  /**
   * The delivery path.
   */
  public deliveryPath: DroneHeartbeatDto[];

  /**
   * Constructs the delivery tracking page component.
   * @param trackingRouterService The tracking router service.
   * @param route The activated route.
   */
  constructor(
    private readonly trackingRouterService: TrackingRouterService,
    private readonly route: ActivatedRoute
  ) {
    this.deliveryPath = [];
  }

  /**
   * Triggered when the delivery tracking page component is initialized.
   */
  public ngOnInit(): void {
    // Get the delivery path.
    this.route.params
      .pipe(mergeMap((params) => this.trackingRouterService.getDeliveryPath(params['id'])))
      .subscribe((deliveryPath) => {
        this.deliveryPath = deliveryPath;
      });
  }
}
