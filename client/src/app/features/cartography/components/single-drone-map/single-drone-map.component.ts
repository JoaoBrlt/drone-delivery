import { Component, Inject, Input, LOCALE_ID, ViewChild } from '@angular/core';
import { LatLngExpression, marker, polyline } from 'leaflet';
import { MapComponent } from '@features/cartography/components/map/map.component';
import { DroneHeartbeatDto } from '@core/dtos/drone-heartbeat.dto';
import { formatDate } from '@angular/common';
import { DroneIconService } from '@features/cartography/services/drone-icon/drone-icon.service';

@Component({
  selector: 'app-single-drone-map',
  templateUrl: './single-drone-map.component.html',
  styleUrls: ['./single-drone-map.component.scss']
})
export class SingleDroneMapComponent {
  /**
   * The map component.
   */
  @ViewChild(MapComponent)
  private mapComponent: MapComponent;

  /**
   * Sets the delivery path.
   * @param deliveryPath The new delivery path.
   */
  @Input()
  set deliveryPath(deliveryPath: DroneHeartbeatDto[]) {
    this.updateDeliveryPath(deliveryPath);
  }

  /**
   * Constructs the delivery map component.
   * @param locale The application locale.
   * @param droneIconService The drone icon service.
   */
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private droneIconService: DroneIconService
  ) {}

  /**
   * Updates the delivery path.
   * @param deliveryPath The new delivery path.
   */
  private updateDeliveryPath(deliveryPath: DroneHeartbeatDto[]): void {
    if (this.mapComponent && deliveryPath.length > 0) {
      // Clears the map.
      this.mapComponent.clearMarkers();
      this.mapComponent.clearPolylines();

      // Geopoints.
      const geopoints: LatLngExpression[] = [];
      for (const droneHeartbeat of deliveryPath) {
        geopoints.push([droneHeartbeat.latitude, droneHeartbeat.longitude]);
      }

      // Polyline.
      const droneLine = polyline(geopoints, { color: 'black', dashArray: '5, 5', dashOffset: '5' });

      // Marker.
      const lastDroneHeartbeat = deliveryPath[deliveryPath.length - 1];
      const droneMarker = marker(
        [lastDroneHeartbeat.latitude, lastDroneHeartbeat.longitude],
        { icon: this.droneIconService.getDroneIconFromHeartbeat(lastDroneHeartbeat) }
      );

      // Popup.
      droneMarker.bindPopup(
        `<h3>Drone</h3>
         <p>Position: ${lastDroneHeartbeat.latitude}, ${lastDroneHeartbeat.longitude}</p>
         <p>Last update: ${formatDate(lastDroneHeartbeat.date, 'medium', this.locale)}</p>`
      );

      // Update the map.
      this.mapComponent.addPolyline(droneLine);
      this.mapComponent.addMarker(droneMarker);
    }
  }
}
