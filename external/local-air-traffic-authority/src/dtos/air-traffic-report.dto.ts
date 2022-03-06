import { Coordinates } from './coordinates.dto';
import { VehicleType } from './vehicle-type.dto';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AirTrafficReport {
  /**
   * The owner of the air vehicle.
   */
  @IsString()
  @IsNotEmpty()
  public owner: string;

  /**
   * The type of air vehicle.
   */
  @IsNotEmpty()
  @IsEnum(VehicleType)
  public type: VehicleType;

  /**
   * The identifier of the air vehicle
   */
  @IsString()
  @IsNotEmpty()
  public identifier: string;

  /**
   * The geographical coordinates of the air vehicle.
   */
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Coordinates)
  public coordinates: Coordinates;
}
