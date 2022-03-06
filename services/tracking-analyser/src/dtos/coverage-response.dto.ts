import { IsEnum, IsNotEmpty } from 'class-validator';
import { CoverageLevel } from './coverage-level.dto';

export class CoverageResponseDto {
  /**
   * The level of network coverage at the specified location.
   */
  @IsNotEmpty()
  @IsEnum(CoverageLevel)
  public level: CoverageLevel;
}
