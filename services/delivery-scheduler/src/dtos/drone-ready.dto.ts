import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class DroneReadyDto {
  /**
   * The drone identifier.
   */
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  public droneId: number;

  /**
   * The date on which the drone is ready.
   */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public date: Date;
}
