import { Component, Inject, Input, LOCALE_ID, ViewChild } from '@angular/core';
import { MapComponent } from '@features/cartography/components/map/map.component';
import { GeoJSON, geoJSON, layerGroup, marker } from 'leaflet';
import { DroneHeartbeatDto } from '@core/dtos/drone-heartbeat.dto';
import { formatDate } from '@angular/common';
import { DroneIconService } from '@features/cartography/services/drone-icon/drone-icon.service';
import { UrbanArea } from '@core/dtos/urban-area.dto';
import { Feature } from 'geojson';
import { Coordinates } from '@core/dtos/coordinates.dto';
import { CoverageArea } from '@core/dtos/coverage-area.dto';
import { CoverageLevel } from '@core/dtos/coverage-level.dto';

@Component({
  selector: 'app-multiple-drone-map',
  templateUrl: './multiple-drone-map.component.html',
  styleUrls: ['./multiple-drone-map.component.scss']
})
export class MultipleDroneMapComponent {
  /**
   * The map component.
   */
  @ViewChild(MapComponent)
  private mapComponent: MapComponent;

  /**
   * Sets the last drone heartbeat of each drone.
   * @param droneHeartbeats The last drone heartbeat of each drone.
   */
  @Input()
  set droneHeartbeats(droneHeartbeats: DroneHeartbeatDto[]) {
    this.updateDroneMarkers(droneHeartbeats);
  }

  /**
   * The list of urban areas.
   */
  @Input()
  set urbanAreas(urbanAreas: UrbanArea[]) {
    this.updateUrbanAreas(urbanAreas);
  }

  /**
   * The list of coverage areas.
   */
  @Input()
  set coverageAreas(coverageAreas: CoverageArea[]) {
    this.updateCoverageAreas(coverageAreas);
  }

  /**
   * Constructs the drone map component.
   * @param locale The application locale.
   * @param droneIconService The drone icon service.
   */
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private droneIconService: DroneIconService
  ) {}

  /**
   * Updates the drone markers.
   * @param droneHeartbeats The last drone heartbeat of each drone.
   */
  private async updateDroneMarkers(droneHeartbeats: DroneHeartbeatDto[]): Promise<void> {
    if (this.mapComponent) {
      // Clear the markers.
      this.mapComponent.clearMarkers();

      for (const droneHeartbeat of droneHeartbeats) {
        // Marker.
        const droneMarker = marker(
          [droneHeartbeat.latitude, droneHeartbeat.longitude],
          { icon: this.droneIconService.getDroneIconFromHeartbeat(droneHeartbeat) },
        );

        // Popup.
        droneMarker.bindPopup(
          `<h3>Drone ${droneHeartbeat.droneId}</h3>
           <p>Delivery: ${droneHeartbeat.deliveryId}</p>
           <p>Status: ${droneHeartbeat.status}</p>
           <p>Position: ${droneHeartbeat.latitude}, ${droneHeartbeat.longitude}</p>
           <p>Last update: ${formatDate(droneHeartbeat.date, 'medium', this.locale)}</p>`
        );

        // Add the marker.
        this.mapComponent.addMarker(droneMarker);
      }
    }
  }

  /**
   * Converts geographical coordinates to an array of numbers.
   * @param coordinates The geographical coordinates.
   * @private
   */
  private static convertCoordinatesToArray(coordinates: Coordinates): number[] {
    return [coordinates.longitude, coordinates.latitude];
  }

  private static convertBoundariesTo2DArray(boundaries: Coordinates[]): number[][] {
    return boundaries.map((coordinates: Coordinates) =>
      MultipleDroneMapComponent.convertCoordinatesToArray(coordinates),
    );
  }

  /**
   * Updates the urban areas.
   * @param urbanAreas The list of urban areas.
   */
  private updateUrbanAreas(urbanAreas: UrbanArea[]) {
    if (this.mapComponent) {
      const features: GeoJSON[] = [];

      for (const urbanArea of urbanAreas) {
        const feature = geoJSON(
          {
            type: 'Feature',
            properties: {
              name: urbanArea.name,
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                MultipleDroneMapComponent.convertBoundariesTo2DArray(urbanArea.boundaries)
              ],
            },
          } as Feature,
          {
            style: {
              color: '#2196f3',
            },
          },
        );

        features.push(feature);
      }

      this.mapComponent.removeOverlay('urban-areas');
      this.mapComponent.addOverlay('urban-areas', 'Urban areas', layerGroup(features), true);
    }
  }

  private static getCoverageLevel(coverageLevel: CoverageLevel): string {
    switch (coverageLevel) {
      // High signal.
      case CoverageLevel.HIGH:
        return '#4caf50';
      // Medium signal.
      case CoverageLevel.MEDIUM:
        return '#ffc107';
      // No or low signal.
      default:
        return '#f44336';
    }
  }

  /**
   * Updates the coverage areas.
   * @param coverageAreas The list of coverage areas.
   */
  private updateCoverageAreas(coverageAreas: CoverageArea[]) {
    if (this.mapComponent) {
      const features: GeoJSON[] = [];

      for (const coverageArea of coverageAreas) {
        const feature = geoJSON(
          {
            type: 'Feature',
            properties: {
              name: coverageArea.name,
              coverageLevel: coverageArea.level,
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                MultipleDroneMapComponent.convertBoundariesTo2DArray(coverageArea.boundaries)
              ],
            },
          } as Feature,
          {
            style: (feature) => {
              return {
                color: MultipleDroneMapComponent.getCoverageLevel(feature?.properties.coverageLevel)
              };
            },
          },
        );
        features.push(feature);
      }

      this.mapComponent.removeOverlay('coverage-areas');
      this.mapComponent.addOverlay('coverage-areas', 'Network coverage', layerGroup(features), false);
    }
  }
}
