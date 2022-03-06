import { Injectable } from '@angular/core';
import { droneIcon } from '@features/cartography/services/drone-icon/icons/drone.icon';
import { divIcon, DivIcon } from 'leaflet';
import { DroneIcon } from '@features/cartography/services/drone-icon/types/drone-icon.enum';
import { droneLostIcon } from '@features/cartography/services/drone-icon/icons/drone-lost.icon';
import { droneLowBatteryIcon } from '@features/cartography/services/drone-icon/icons/drone-low-battery.icon';
import { droneNoSignalIcon } from '@features/cartography/services/drone-icon/icons/drone-no-signal.icon';
import { dronePoorWeatherIcon } from '@features/cartography/services/drone-icon/icons/drone-poor-weather.icon';
import { droneWarningIcon } from '@features/cartography/services/drone-icon/icons/drone-warning.icon';
import { DroneHeartbeatDto } from '@core/dtos/drone-heartbeat.dto';
import { DroneIconPrimaryColor } from '@features/cartography/services/drone-icon/types/drone-icon-primary-color.enum';
import {
  DroneIconSecondaryColor
} from '@features/cartography/services/drone-icon/types/drone-icon-secondary-color.enum';
import { DroneStatus } from '@core/dtos/drone-status.dto';

@Injectable({
  providedIn: 'root'
})
export class DroneIconService {
  private static getDroneIconBody(type: DroneIcon, ...colors: string[]): string {
    switch (type) {
      // Lost.
      case DroneIcon.LOST:
        return droneLostIcon(colors[0], colors[1]);
      // Low battery.
      case DroneIcon.LOW_BATTERY:
        return droneLowBatteryIcon(colors[0], colors[1]);
      // No signal.
      case DroneIcon.NO_SIGNAL:
        return droneNoSignalIcon(colors[0], colors[1]);
      // Poor weather.
      case DroneIcon.POOR_WEATHER:
        return dronePoorWeatherIcon(colors[0], colors[1]);
      // Warning.
      case DroneIcon.WARNING:
        return droneWarningIcon(colors[0], colors[1]);
      // Normal.
      default:
        return droneIcon(colors[0]);
    }
  }

  public getDroneIcon(type: DroneIcon, ...colors: string[]): DivIcon {
    return divIcon({
      html: DroneIconService.getDroneIconBody(type, ...colors),
      className: 'marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, 0]
    });
  }

  public getDroneIconFromHeartbeat(droneHeartbeat: DroneHeartbeatDto): DivIcon {
    const droneColor = droneHeartbeat.isCritical ? DroneIconPrimaryColor.CRITICAL : DroneIconPrimaryColor.NORMAL;

    switch (droneHeartbeat.status) {
      // Lost.
      case DroneStatus.LOST:
        return this.getDroneIcon(DroneIcon.LOST, droneColor, DroneIconSecondaryColor.ERROR);
      // Dysfunctional.
      case DroneStatus.DYSFUNCTIONAL:
        return this.getDroneIcon(DroneIcon.WARNING, droneColor, DroneIconSecondaryColor.ERROR);
      // No signal.
      case DroneStatus.NO_SIGNAL:
        return this.getDroneIcon(DroneIcon.NO_SIGNAL, droneColor, DroneIconSecondaryColor.WARNING);
      // Normal.
      default:
        return this.getDroneIcon(DroneIcon.NORMAL, droneColor);
    }
  }
}
