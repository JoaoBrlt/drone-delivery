import { GeoPoint } from '../types/geo-point.type';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DroneScheduledDto {
  /**
   * The drone identifier.
   */
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  public droneId: number;

  /**
   * The delivery identifier.
   */
  @IsNotEmpty()
  @IsString()
  public deliveryId: string;

  /**
   * The destination address.
   */
  @IsNotEmpty()
  @IsString()
  public destination: string;

  /**
   * The path of the drone.
   */
  @IsNotEmpty()
  public path: GeoPoint[];

  /**
   * The departure date of the drone.
   */
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  public date: Date;
}
