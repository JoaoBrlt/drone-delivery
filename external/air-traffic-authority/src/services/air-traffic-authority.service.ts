import { Injectable } from '@nestjs/common';
import inside = require('point-in-polygon');
import { UrbanArea } from '../dtos/urban-area.dto';
import { Coordinates } from '../dtos/coordinates.dto';

@Injectable()
export class AirTrafficAuthorityService {
  /**
   * The list of known urban areas.
   */
  private readonly areas: UrbanArea[];

  /**
   * Initialize the air traffic authority service.
   */
  constructor() {
    this.areas = [
      {
        name: 'Nice',
        serviceURL: 'local-air-traffic-authority-1:5001', // 'localhost:5001',
        boundaries: [
          {
            latitude: 43.75968,
            longitude: 7.19947,
          },
          {
            latitude: 43.73786,
            longitude: 7.18231,
          },
          {
            latitude: 43.64129,
            longitude: 7.20291,
          },
          {
            latitude: 43.66762,
            longitude: 7.23209,
          },
          {
            latitude: 43.68922,
            longitude: 7.23999,
          },
          {
            latitude: 43.69443,
            longitude: 7.27226,
          },
          {
            latitude: 43.68599,
            longitude: 7.30144,
          },
          {
            latitude: 43.70585,
            longitude: 7.31243,
          },
          {
            latitude: 43.71652,
            longitude: 7.30453,
          },
          {
            latitude: 43.73835,
            longitude: 7.31861,
          },
          {
            latitude: 43.75968,
            longitude: 7.19947,
          },
        ],
      },
      {
        name: 'Paris',
        serviceURL: 'local-air-traffic-authority-2:5002', // 'localhost:5002',
        boundaries: [
          {
            latitude: 48.84981,
            longitude: 2.22267,
          },
          {
            latitude: 48.84596,
            longitude: 2.25597,
          },
          {
            latitude: 48.83671,
            longitude: 2.27142,
          },
          {
            latitude: 48.82088,
            longitude: 2.32189,
          },
          {
            latitude: 48.81635,
            longitude: 2.36068,
          },
          {
            latitude: 48.82992,
            longitude: 2.40428,
          },
          {
            latitude: 48.81748,
            longitude: 2.45887,
          },
          {
            latitude: 48.83963,
            longitude: 2.47398,
          },
          {
            latitude: 48.84686,
            longitude: 2.44411,
          },
          {
            latitude: 48.84167,
            longitude: 2.41355,
          },
          {
            latitude: 48.86901,
            longitude: 2.41631,
          },
          {
            latitude: 48.89993,
            longitude: 2.39331,
          },
          {
            latitude: 48.90016,
            longitude: 2.32292,
          },
          {
            latitude: 48.87984,
            longitude: 2.28343,
          },
          {
            latitude: 48.87826,
            longitude: 2.24601,
          },
          {
            latitude: 48.84981,
            longitude: 2.22267,
          },
        ],
      },
    ];
  }

  /**
   * Converts geographical coordinates to an array of numbers.
   * @param coordinates The geographical coordinates.
   * @private
   */
  private static convertCoordinatesToArray(coordinates: Coordinates): number[] {
    return [coordinates.latitude, coordinates.longitude];
  }

  /**
   * Returns all known urban areas.
   */
  public getUrbanAreas(): UrbanArea[] {
    return this.areas;
  }

  /**
   * Finds the urban area corresponding to given geographical coordinates.
   * @param coordinates The geographical coordinates.
   */
  public findUrbanAreaByCoordinates(coordinates: Coordinates): UrbanArea {
    return this.areas.find((area: UrbanArea) =>
      inside(
        AirTrafficAuthorityService.convertCoordinatesToArray(coordinates),
        area.boundaries.map((coordinates: Coordinates) =>
          AirTrafficAuthorityService.convertCoordinatesToArray(coordinates),
        ),
      ),
    );
  }
}
