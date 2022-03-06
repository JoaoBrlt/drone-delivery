import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Coordinates } from './coordinates.dto';

export class UrbanArea {
  /**
   * The name of the urban area.
   */
  @IsString()
  @IsNotEmpty()
  public name: string;

  /**
   * The service URL of the urban area.
   */
  @IsString()
  @IsNotEmpty()
  public serviceURL: string;

  /**
   * The boundaries of the urban area.
   */
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Coordinates)
  public boundaries: Coordinates[];
}
