import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DeliveryDto {
  /**
   * The drone id
   */
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  public droneId: number;

  /**
   * The delivery id
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
   * The path to follow
   */
  @IsNotEmpty()
  @Type(() => GeoPointDto)
  public path: GeoPointDto[];

  /**
   * The departure date
   */
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  public date: Date;
}

export class GeoPointDto {
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
