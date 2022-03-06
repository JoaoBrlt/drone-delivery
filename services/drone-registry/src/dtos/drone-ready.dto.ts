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
   * The date and time of departure for the delivery (associated with the order)
   * is optional, can be empty, will be then fixed at Date.now()
   */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public date: Date;
}
