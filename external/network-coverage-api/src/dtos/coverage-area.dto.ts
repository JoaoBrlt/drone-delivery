import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Coordinates } from './coordinates.dto';
import { Type } from 'class-transformer';
import { CoverageLevel } from './coverage-level.dto';

export class CoverageArea {
  /**
   * The name of the network coverage area.
   */
  @IsNotEmpty()
  @IsString()
  public name: string;

  /**
   * The level of network coverage of the area.
   */
  @IsNotEmpty()
  @IsEnum(CoverageLevel)
  public level: CoverageLevel;

  /**
   * The boundaries of the coverage area.
   */
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Coordinates)
  public boundaries: Coordinates[];
}
