export class GeoPoint {
  /**
   * The latitude (in decimal degrees).
   */
  public latitude: number;

  /**
   * The longitude (in decimal degrees).
   */
  public longitude: number;

  /**
   * The number of meters above sea level.
   */
  public altitude: number;

  /**
   * The order of the geographical point.
   */
  public order?: number;
}
