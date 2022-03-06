import { Coordinates } from './coordinates.dto';
import { CoverageLevel } from './coverage-level.dto';

export class CoverageArea {
  /**
   * The name of the network coverage area.
   */
  public name: string;

  /**
   * The level of network coverage of the area.
   */
  public level: CoverageLevel;

  /**
   * The boundaries of the coverage area.
   */
  public boundaries: Coordinates[];
}
