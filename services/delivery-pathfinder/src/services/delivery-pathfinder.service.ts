import { Injectable } from '@nestjs/common';
import { GeoPoint } from '../types/geo-point.type';

@Injectable()
export class DeliveryPathfinderService {
  /**
   * The number of points in a delivery path (used by the mocked algorithm).
   */
  private static readonly PATH_LENGTH: number = 10;

  /**
   * Rounds a number.
   * @param value The number to be rounded.
   * @param decimals The number of decimals to keep.
   */
  private static roundNumber(value: number, decimals: number) {
    const power = Math.pow(10, decimals);
    return Math.round((value + Number.EPSILON) * power) / power;
  }

  /**
   * Geocodes an address.
   * @param address The address to be geocoded.
   */
  public geocode(address: string): GeoPoint {
    // Paris.
    if (address.includes('Paris')) {
      return {
        latitude: 48.85889,
        longitude: 2.32004,
        altitude: 35,
      };
    }
    // Villeneuve-Loubet.
    else if (address.includes('Villeneuve-Loubet')) {
      return {
        latitude: 43.65756,
        longitude: 7.12253,
        altitude: 0,
      };
    }
    // Nice.
    return {
      latitude: 43.70094,
      longitude: 7.26839,
      altitude: 0,
    };
  }

  /**
   * Computes a path.
   * @param a The point of departure.
   * @param b The point of arrival.
   */
  public computePath(a: GeoPoint, b: GeoPoint): GeoPoint[] {
    const result: GeoPoint[] = [];

    // Get the number of steps.
    const steps = DeliveryPathfinderService.PATH_LENGTH;

    // Compute the orthogonal distances.
    const latitudeDistance = b.latitude - a.latitude;
    const longitudeDistance = b.longitude - a.longitude;
    const altitudeDistance = b.altitude - a.altitude;

    // Compute the path.
    for (let i = 0; i <= steps; i++) {
      const point = {
        latitude: DeliveryPathfinderService.roundNumber(a.latitude + (latitudeDistance * i) / steps, 5),
        longitude: DeliveryPathfinderService.roundNumber(a.longitude + (longitudeDistance * i) / steps, 5),
        altitude: DeliveryPathfinderService.roundNumber(a.altitude + (altitudeDistance * i) / steps, 5),
      };

      result.push(point);
    }

    return result;
  }
}
