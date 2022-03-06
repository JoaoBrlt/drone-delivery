import { Coordinates } from './coordinates.dto';

export class UrbanArea {
  /**
   * The name of the urban area.
   */
  public name: string;

  /**
   * The service URL of the urban area.
   */
  public serviceURL: string;

  /**
   * The boundaries of the urban area.
   */
  public boundaries: Coordinates[];
}
