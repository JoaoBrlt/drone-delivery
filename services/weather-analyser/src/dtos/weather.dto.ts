import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { WeatherStatus } from '../types/weather-status';

export class WeatherDto {
  /**
   * The weather status.
   */
  @IsNotEmpty()
  @IsEnum(WeatherStatus)
  public status: WeatherStatus;

  //The weather is located in a specific zone, approximated by a center-point and a radius
  /**
   * The latitude of the center-point.
   */
  @IsNotEmpty()
  @IsNumber()
  public latitude: number;
  /**
   * The longitude of the center-point.
   */
  @IsNotEmpty()
  @IsNumber()
  public longitude: number;
  /**
   * The radius of the drone.
   */
  @IsNotEmpty()
  @IsNumber()
  public radius: number;

  /**
   * The bad weather event start datetime.
   */
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  public dateStart: Date;

  /**
   * The bad weather event end datetime.
   */
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  public dateEnd: Date;
}
