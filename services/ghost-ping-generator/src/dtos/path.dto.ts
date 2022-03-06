import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { GeoPointDto } from './geopoint.dto';

export class PathDto {
  /**
   * The drone identifier.
   */
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  public droneId: number;

  @IsNotEmpty()
  public coordinates: GeoPointDto[];
}
