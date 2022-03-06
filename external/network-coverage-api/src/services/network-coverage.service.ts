import {Injectable} from '@nestjs/common';
import {Coordinates} from '../dtos/coordinates.dto';
import {CoverageArea} from '../dtos/coverage-area.dto';
import {CoverageResponseDto} from '../dtos/coverage-response.dto';
import {CoverageLevel} from '../dtos/coverage-level.dto';
import inside = require('point-in-polygon');

@Injectable()
export class NetworkCoverageService {
  /**
   * The network coverage areas.
   */
  private readonly coverageAreas: CoverageArea[];

  /**
   * Constructs the network coverage service.
   */
  constructor() {
    this.coverageAreas = [
      // Nice - South.
      {
        name: 'Nice (South)',
        level: CoverageLevel.HIGH,
        boundaries: [
          {
            latitude: 43.67234,
            longitude: 7.19844,
          },
          {
            latitude: 43.66662,
            longitude: 7.20291,
          },
          {
            latitude: 43.66811,
            longitude: 7.21836,
          },
          {
            latitude: 43.67606,
            longitude: 7.22969,
          },
          {
            latitude: 43.68301,
            longitude: 7.23381,
          },
          {
            latitude: 43.68947,
            longitude: 7.24342,
          },
          {
            latitude: 43.69319,
            longitude: 7.25646,
          },
          {
            latitude: 43.69443,
            longitude: 7.27088,
          },
          {
            latitude: 43.69369,
            longitude: 7.28359,
          },
          {
            latitude: 43.69145,
            longitude: 7.29081,
          },
          {
            latitude: 43.68649,
            longitude: 7.29938,
          },
          {
            latitude: 43.68773,
            longitude: 7.30556,
          },
          {
            latitude: 43.69468,
            longitude: 7.30831,
          },
          {
            latitude: 43.70238,
            longitude: 7.30968,
          },
          {
            latitude: 43.71007,
            longitude: 7.31381,
          },
          {
            latitude: 43.71553,
            longitude: 7.31002,
          },
          {
            latitude: 43.72694,
            longitude: 7.30762,
          },
          {
            latitude: 43.73141,
            longitude: 7.30522,
          },
          {
            latitude: 43.73662,
            longitude: 7.28908,
          },
          {
            latitude: 43.73662,
            longitude: 7.25509,
          },
          {
            latitude: 43.73091,
            longitude: 7.23484,
          },
          {
            latitude: 43.71901,
            longitude: 7.21836,
          },
          {
            latitude: 43.70933,
            longitude: 7.20531,
          },
          {
            latitude: 43.70957,
            longitude: 7.19158,
          },
          {
            latitude: 43.70014,
            longitude: 7.18608,
          },
          {
            latitude: 43.68798,
            longitude: 7.18986,
          },
          {
            latitude: 43.67234,
            longitude: 7.19844,
          },
        ],
      },
      // Nice - North.
      {
        name: 'Nice (North)',
        level: CoverageLevel.MEDIUM,
        boundaries: [
          {
            latitude: 43.70561,
            longitude: 7.18574,
          },
          {
            latitude: 43.70138,
            longitude: 7.18608,
          },
          {
            latitude: 43.70982,
            longitude: 7.19123,
          },
          {
            latitude: 43.70957,
            longitude: 7.20565,
          },
          {
            latitude: 43.73141,
            longitude: 7.23381,
          },
          {
            latitude: 43.73711,
            longitude: 7.25406,
          },
          {
            latitude: 43.73736,
            longitude: 7.28839,
          },
          {
            latitude: 43.73241,
            longitude: 7.30487,
          },
          {
            latitude: 43.72694,
            longitude: 7.30796,
          },
          {
            latitude: 43.71727,
            longitude: 7.30968,
          },
          {
            latitude: 43.71081,
            longitude: 7.31414,
          },
          {
            latitude: 43.71429,
            longitude: 7.31792,
          },
          {
            latitude: 43.72992,
            longitude: 7.32547,
          },
          {
            latitude: 43.74108,
            longitude: 7.32616,
          },
          {
            latitude: 43.75621,
            longitude: 7.30625,
          },
          {
            latitude: 43.76117,
            longitude: 7.28942,
          },
          {
            latitude: 43.76018,
            longitude: 7.25715,
          },
          {
            latitude: 43.75101,
            longitude: 7.23003,
          },
          {
            latitude: 43.74257,
            longitude: 7.21183,
          },
          {
            latitude: 43.72918,
            longitude: 7.19398,
          },
          {
            latitude: 43.72248,
            longitude: 7.18368,
          },
          {
            latitude: 43.70561,
            longitude: 7.18574,
          },
        ],
      },
      // Nice - Airport.
      {
        name: 'Nice (Airport)',
        level: CoverageLevel.LOW,
        boundaries: [
          {
            latitude: 43.66687,
            longitude: 7.20188,
          },
          {
            latitude: 43.66613,
            longitude: 7.19879,
          },
          {
            latitude: 43.64576,
            longitude: 7.19947,
          },
          {
            latitude: 43.64751,
            longitude: 7.21183,
          },
          {
            latitude: 43.66588,
            longitude: 7.22969,
          },
          {
            latitude: 43.67781,
            longitude: 7.23141,
          },
          {
            latitude: 43.66861,
            longitude: 7.21836,
          },
          {
            latitude: 43.66687,
            longitude: 7.20188,
          },
        ],
      },
      {
        name: 'Cagnes-sur-Mer',
        level: CoverageLevel.LOW,
        boundaries: [
          {
            longitude: 7.113304138183594,
            latitude: 43.70883438937536,
          },
          {
            longitude: 7.142486572265625,
            latitude: 43.64203827340191,
          },
          {
            longitude: 7.1555328369140625,
            latitude: 43.652223896596475,
          },
          {
            longitude: 7.170982360839843,
            latitude: 43.655204727868515,
          },
          {
            longitude: 7.176818847656249,
            latitude: 43.6571918665181,
          },
          {
            longitude: 7.171669006347656,
            latitude: 43.73091784974365,
          },
          {
            longitude: 7.132873535156249,
            latitude: 43.728436967960704,
          },
          {
            longitude: 7.113304138183594,
            latitude: 43.70883438937536,
          }
        ],
      },
    ];
  }

  /**
   * Returns all the network coverage areas.
   */
  public getNetworkCoverageAreas(): CoverageArea[] {
    return this.coverageAreas;
  }

  /**
   * Converts geographical coordinates to an array of numbers.
   * @param coordinates The geographical coordinates.
   */
  private static convertCoordinatesToArray(coordinates: Coordinates): number[] {
    return [coordinates.latitude, coordinates.longitude];
  }

  /**
   * Returns the network coverage of a specific location.
   * @param coordinates The geographical coordinates.
   */
  public getNetworkCoverage(coordinates: Coordinates): CoverageResponseDto {
    // Try to find a network coverage area.
    const coverageArea = this.coverageAreas.find((area: CoverageArea) =>
      inside(
        NetworkCoverageService.convertCoordinatesToArray(coordinates),
        area.boundaries.map((coordinates: Coordinates) =>
          NetworkCoverageService.convertCoordinatesToArray(coordinates),
        ),
      ),
    );

    // Found.
    if (coverageArea) {
      return {
        level: coverageArea.level,
      };
    }

    // Not found.
    return {
      level: CoverageLevel.NONE,
    };
  }
}
