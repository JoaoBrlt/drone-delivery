import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class GeoPointDto {
  /**
   * Position of the point in the path ordering
   */
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  public order?: number;

  @IsNotEmpty()
  @IsNumber()
  public longitude: number;

  @IsNotEmpty()
  @IsNumber()
  public latitude: number;

  @IsNotEmpty()
  @IsNumber()
  public altitude: number;
}
