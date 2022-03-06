import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GeoPoint } from '../types/geo-point.type';

export enum AlertStatus {
  LOST = 'LOST',
  FAILURE = 'FAILURE',
  NO_SIGNAL = 'NO_SIGNAL',
}

export class AlertDto {
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
   * The current point (location) of the drone when the alert is sent
   */
  @IsNotEmpty()
  @ValidateNested() //Will perform the validation (check Decorators) IN the GeoPoint class
  @Type(() => GeoPoint)
  public currentPoint: GeoPoint;

  /**
   * The destination text (the string) of the drone.
   */
  @IsString()
  public destinationText: string;

  /**
   * The destination point (the GeoPoint) of the drone.
   */
  @ValidateNested() //Will perform the validation (check Decorators) IN the GeoPoint class
  @Type(() => GeoPoint)
  public destinationPoint: GeoPoint;

  /**
   * The alert status -> Enum
   */
  @IsNotEmpty()
  @IsEnum(AlertStatus)
  public status: AlertStatus;

  /**
   * The timestamp of the alert (can only be equal to now() when used with the normal route as the drone)
   *  -> Kept as a parameter here for code simplicity (entry point == exit point) + DEBUGGING if needed
   */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public date: Date;
}
