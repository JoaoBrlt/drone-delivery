import { CoverageLevel } from './coverage-level.dto';

export class CoverageResponseDto {
  /**
   * The level of network coverage at the specified location.
   */
  public level: CoverageLevel;
}
