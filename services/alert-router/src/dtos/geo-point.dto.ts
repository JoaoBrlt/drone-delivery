import { IsNumber, IsOptional } from 'class-validator';

export class GeoPoint {
  /**
   * The latitude (in decimal degrees).
   */
  @IsNumber()
  public latitude: number;

  /**
   * The longitude (in decimal degrees).
   */
  @IsNumber()
  public longitude: number;

  /**
   * The number of meters above sea level.
   */
  @IsNumber()
  public altitude: number;

  /**
   * The order of the geographical point.
   */
  @IsOptional()
  @IsNumber()
  public order?: number;
}
