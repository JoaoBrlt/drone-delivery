import { AfterViewInit, Component } from '@angular/core';
import { control, Control, Layer, Map, map, Marker, Polyline, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  /**
   * The leaflet map.
   */
  private map: Map;

  /**
   * The markers.
   */
  private markers: Marker[];

  /**
   * The polygon lines.
   */
  private polylines: Polyline[];

  /**
   * The layers control.
   */
  private layersControl?: Control.Layers;

  /**
   * The overlay layers.
   */
  private readonly overlayLayers: Record<string, Layer>;

  /**
   * Constructs the map component.
   */
  constructor() {
    this.markers = [];
    this.polylines = [];
    this.overlayLayers = {};
  }

  /**
   * Triggered after the map component has been initialized.
   */
  public ngAfterViewInit(): void {
    this.initializeMap();
  }

  /**
   * Initializes the leaflet map.
   */
  private initializeMap(): void {
    // Initialize the map.
    this.map = map('map', {
      center: [46.71109, 1.71910],
      zoom: 6
    });

    // Initialize the tile layer.
    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // Add the tile layer.
    tiles.addTo(this.map);


  }

  /**
   * Adds a marker to the map.
   * @param marker The marker to be added.
   */
  public addMarker(marker: Marker): void {
    marker.addTo(this.map);
    this.markers.push(marker);
  }

  /**
   * Clears all the markers of the map.
   */
  public clearMarkers(): void {
    for (const marker of this.markers) {
      marker.removeFrom(this.map);
    }
    this.markers = [];
  }

  /**
   * Adds a polyline to the map.
   * @param polyline The polyline to be added.
   */
  public addPolyline(polyline: Polyline): void {
    polyline.addTo(this.map);
    this.polylines.push(polyline);
  }

  /**
   * Clears the polylines.
   */
  public clearPolylines(): void {
    for (const polyline of this.polylines) {
      polyline.removeFrom(this.map);
    }
    this.polylines = [];
  }

  /**
   * Adds an overlay layer to the map.
   * @param identifier The overlay identifier.
   * @param title The overlay title.
   * @param layer The overlay layer.
   * @param enabled Whether the overlay should be enabled by default.
   */
  public addOverlay(identifier: string, title: string, layer: Layer, enabled: boolean): void {
    // Add the layers control.
    if (!this.layersControl) {
      this.layersControl = control.layers();
      this.layersControl.addTo(this.map);
    }

    // Add the overlay layer.
    this.layersControl.addOverlay(layer, title);
    this.overlayLayers[identifier] = layer;

    // Enable the overlay layer.
    if (enabled) {
      layer.addTo(this.map);
    }
  }

  /**
   * Remove an overlay layer from the map.
   * @param identifier The overlay identifier.
   */
  public removeOverlay(identifier: string): void {
    if (this.layersControl && this.overlayLayers[identifier]) {
      // Remove the overlay layer.
      this.layersControl.removeLayer(this.overlayLayers[identifier])
      delete this.overlayLayers[identifier];
    }
  }
}
