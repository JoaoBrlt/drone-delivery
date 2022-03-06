import { IsBoolean, IsInt, Min } from 'class-validator';

export class TestDto {
  @IsBoolean()
  public reset: boolean;

  @IsInt()
  @Min(0)
  public timeout: number;

  @IsInt()
  @Min(0)
  public counterLimit: number;
}
