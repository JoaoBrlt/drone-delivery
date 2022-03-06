import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class Coordinates {
  /**
   * The latitude (in decimal degrees).
   */
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  public latitude: number;

  /**
   * The longitude (in decimal degrees).
   */
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  public longitude: number;
}
