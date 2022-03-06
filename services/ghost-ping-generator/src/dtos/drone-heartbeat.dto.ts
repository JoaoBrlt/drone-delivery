import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DroneStatus } from '../types/drone-status.type';

export class DroneHeartbeatDto {
  /**
   * The drone identifier.
   */
  @IsNotEmpty()
  @IsNumber()
  public droneId: number;

  /**
   * The delivery identifier
   */
  @IsNotEmpty()
  @IsString()
  public deliveryId: string;

  /**
   * Whether the delivery is critical.
   */
  public isCritical: boolean;

  /**
   * The drone status.
   */
  @IsNotEmpty()
  @IsEnum(DroneStatus)
  public status: DroneStatus;

  /**
   * The latitude of the drone.
   */
  @IsNotEmpty()
  @IsNumber()
  public latitude: number;

  /**
   * The longitude of the drone.
   */
  @IsNotEmpty()
  @IsNumber()
  public longitude: number;

  /**
   * The altitude of the drone.
   */
  @IsNotEmpty()
  @IsNumber()
  public altitude: number;

  /**
   * The date of the heartbeat.
   */
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  public date: Date;
}
