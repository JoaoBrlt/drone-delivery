import { WeatherDto } from './weather.dto';
import { IsDate, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class WeatherAlertDto {
  @IsNotEmpty()
  @IsInt()
  public droneId: number;

  @IsNotEmpty()
  @ValidateNested()
  public weatherEvent: WeatherDto;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  public date: Date;
}
